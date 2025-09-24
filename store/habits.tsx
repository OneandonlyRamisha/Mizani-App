import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { useSQLiteContext, type SQLiteDatabase } from "expo-sqlite";

import {
  Habit,
  HabitCategory,
  HabitDifficulty,
  HabitRepeat,
} from "../types/habit";
import { formatDateKey } from "../lib/dateUtils";

type HabitAction =
  | { type: "SET_HABITS"; payload: Habit[] }
  | { type: "ADD_HABIT"; payload: Habit }
  | { type: "UPDATE_HABIT"; payload: Habit }
  | { type: "DELETE_HABIT"; payload: string }
  | {
      type: "TOGGLE_HABIT";
      payload: { id: string; date: string; streak: number };
    };

function habitReducer(state: Habit[], action: HabitAction): Habit[] {
  switch (action.type) {
    case "SET_HABITS":
      return action.payload;
    case "ADD_HABIT":
      return [...state, action.payload];
    case "UPDATE_HABIT":
      return state.map((habit) =>
        habit.id === action.payload.id ? { ...habit, ...action.payload } : habit
      );
    case "DELETE_HABIT":
      return state.filter((habit) => habit.id !== action.payload);
    case "TOGGLE_HABIT":
      return state.map((habit) => {
        if (habit.id !== action.payload.id) {
          return habit;
        }

        const updatedCompleted = habit.completed.includes(action.payload.date)
          ? habit.completed.filter((date) => date !== action.payload.date)
          : [...habit.completed, action.payload.date];

        return {
          ...habit,
          completed: updatedCompleted,
          streak: action.payload.streak,
        };
      });
    default:
      return state;
  }
}

const VALID_REPEAT_TYPES: HabitRepeat["type"][] = [
  "Daily",
  "Custom",
  "Once",
];

function parseHabitRow(row: any): Habit {
  let completed: string[] = [];
  try {
    completed = row.completed ? JSON.parse(row.completed) : [];
  } catch (error) {
    console.error("Failed to parse habit completion data:", error);
  }

  let repeat: HabitRepeat = { type: "Daily", days: [] };
  try {
    const storedRepeat = row.repeat ? JSON.parse(row.repeat) : null;
    if (
      storedRepeat &&
      typeof storedRepeat.type === "string" &&
      VALID_REPEAT_TYPES.includes(storedRepeat.type) &&
      Array.isArray(storedRepeat.days)
    ) {
      repeat = {
        type: storedRepeat.type,
        days: storedRepeat.days,
        ...(storedRepeat.selectedDate
          ? { selectedDate: storedRepeat.selectedDate }
          : {}),
      } as HabitRepeat;
    }
  } catch (error) {
    console.error("Failed to parse habit repeat data:", error);
  }

  const difficulty = row.difficulty as HabitDifficulty;
  const category = row.category as HabitCategory;

  return {
    id: row.id,
    name: row.name,
    createDate: row.createDate ?? formatDateKey(new Date()),
    completed,
    streak: row.streak ?? 0,
    difficulty: difficulty ?? "Medium",
    repeat,
    category: category ?? "Faith",
  };
}

async function persistHabit(
  action: HabitAction,
  db: SQLiteDatabase,
  habits: Habit[]
): Promise<void> {
  try {
    switch (action.type) {
      case "ADD_HABIT": {
        const habit = action.payload;
        await db.runAsync(
          `INSERT OR REPLACE INTO habits
            (id, name, createDate, completed, streak, difficulty, repeat, category)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            habit.id,
            habit.name,
            habit.createDate || formatDateKey(new Date()),
            JSON.stringify(habit.completed ?? []),
            habit.streak ?? 0,
            habit.difficulty,
            JSON.stringify(habit.repeat),
            habit.category,
          ]
        );
        break;
      }
      case "UPDATE_HABIT": {
        const habit = action.payload;
        await db.runAsync(
          `UPDATE habits SET
              name = ?,
              createDate = ?,
              completed = ?,
              streak = ?,
              difficulty = ?,
              repeat = ?,
              category = ?
            WHERE id = ?`,
          [
            habit.name,
            habit.createDate || formatDateKey(new Date()),
            JSON.stringify(habit.completed ?? []),
            habit.streak ?? 0,
            habit.difficulty,
            JSON.stringify(habit.repeat),
            habit.category,
            habit.id,
          ]
        );
        break;
      }
      case "DELETE_HABIT": {
        await db.runAsync(`DELETE FROM habits WHERE id = ?`, [action.payload]);
        break;
      }
      case "TOGGLE_HABIT": {
        const habit = habits.find((item) => item.id === action.payload.id);
        if (!habit) {
          break;
        }

        const updatedCompleted = habit.completed.includes(action.payload.date)
          ? habit.completed.filter((date) => date !== action.payload.date)
          : [...habit.completed, action.payload.date];

        await db.runAsync(
          `UPDATE habits SET completed = ?, streak = ? WHERE id = ?`,
          [JSON.stringify(updatedCompleted), action.payload.streak, habit.id]
        );
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.error("Failed to persist habit action:", error);
  }
}

interface HabitContextType {
  habits: Habit[];
  dispatch: React.Dispatch<HabitAction>;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [habits, dispatch] = useReducer(habitReducer, []);

  useEffect(() => {
    let isMounted = true;

    const loadHabits = async () => {
      try {
        const rows = await db.getAllAsync<any>("SELECT * FROM habits");
        if (!isMounted) return;
        const parsedHabits = rows.map(parseHabitRow);
        dispatch({ type: "SET_HABITS", payload: parsedHabits });
      } catch (error) {
        console.error("Failed to load habits:", error);
      }
    };

    loadHabits();

    return () => {
      isMounted = false;
    };
  }, [db]);

  const wrappedDispatch: React.Dispatch<HabitAction> = (action) => {
    if (action.type !== "SET_HABITS") {
      void persistHabit(action, db, habits);
    }

    dispatch(action);
  };

  return (
    <HabitContext.Provider value={{ habits, dispatch: wrappedDispatch }}>
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
}
