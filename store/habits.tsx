// import React, { createContext, useReducer, useContext, ReactNode } from "react";
// import { Habit } from "../types/habit";
// import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";

// type HabitAction =
//   | { type: "ADD_HABIT"; payload: Habit }
//   | { type: "UPDATE_HABIT"; payload: Habit }
//   | { type: "DELETE_HABIT"; payload: string }
//   | {
//       type: "TOGGLE_HABIT";
//       payload: { id: string; date: string; streak: number };
//     };

// function habitReducer(
//   state: Habit[],
//   action: HabitAction,
//   db: SQLiteDatabase
// ): Habit[] {
//   switch (action.type) {
//     case "ADD_HABIT": {
//       const newHabit = action.payload;

//       // Save to SQLite
//       db.runAsync(
//         `INSERT OR REPLACE INTO habits
//       (id, name, createDate, completed, streak, difficulty, repeat, category)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//         [
//           newHabit.id,
//           newHabit.name,
//           newHabit.createDate || new Date().toISOString(),
//           JSON.stringify(newHabit.completed || []),
//           newHabit.streak || 0,
//           newHabit.difficulty,
//           JSON.stringify(newHabit.repeat), // <-- stringify object here
//           newHabit.category,
//         ]
//       ).catch((err) => console.error("Failed to save habit to DB:", err));

//       return [...state, newHabit];
//     }

//     case "UPDATE_HABIT": {
//       const updatedHabit = action.payload;

//       // Save updated habit to SQLite
//       db.runAsync(
//         `UPDATE habits SET
//       name = ?,
//       createDate = ?,
//       completed = ?,
//       streak = ?,
//       difficulty = ?,
//       repeat = ?,
//       category = ?
//       WHERE id = ?`,
//         [
//           updatedHabit.name,
//           updatedHabit.createDate || new Date().toISOString(),
//           JSON.stringify(updatedHabit.completed || []),
//           updatedHabit.streak || 0,
//           updatedHabit.difficulty,
//           JSON.stringify(updatedHabit.repeat), // serialize repeat object
//           updatedHabit.category,
//           updatedHabit.id,
//         ]
//       ).catch((err) => console.error("Failed to update habit in DB:", err));

//       return state.map((habit) =>
//         habit.id === updatedHabit.id ? { ...habit, ...updatedHabit } : habit
//       );
//     }

//     case "DELETE_HABIT": {
//       const habitId = action.payload;

//       // Delete habit from SQLite
//       db.runAsync(`DELETE FROM habits WHERE id = ?`, [habitId]).catch((err) =>
//         console.error("Failed to delete habit from DB:", err)
//       );

//       // Remove habit from state
//       return state.filter((habit) => habit.id !== habitId);
//     }

//     case "TOGGLE_HABIT": {
//       const { id, date, streak } = action.payload;

//       return state.map((habit) => {
//         if (habit.id === id) {
//           const updatedCompleted = habit.completed?.includes(date)
//             ? habit.completed.filter((d) => d !== date)
//             : [...(habit.completed || []), date];

//           // Update habit in SQLite
//           db.runAsync(
//             `UPDATE habits SET completed = ?, streak = ? WHERE id = ?`,
//             [JSON.stringify(updatedCompleted), streak, id]
//           ).catch((err) => console.error("Failed to update habit in DB:", err));

//           return {
//             ...habit,
//             completed: updatedCompleted,
//             streak,
//           };
//         }
//         return habit;
//       });
//     }

//     default:
//       return state;
//   }
// }

// interface HabitContextType {
//   habits: Habit[];
//   dispatch: React.Dispatch<HabitAction>;
// }

// const HabitContext = createContext<HabitContextType | undefined>(undefined);

// export function HabitProvider({ children }: { children: ReactNode }) {
//   const db = useSQLiteContext();

//   const [habits, dispatch] = useReducer(habitReducer, []);
//   return (
//     <HabitContext.Provider value={{ habits, dispatch }}>
//       {children}
//     </HabitContext.Provider>
//   );
// }

// export function useHabits() {
//   const context = useContext(HabitContext);
//   if (!context) {
//     throw new Error("useHabits must be used within a HabitProvider");
//   }
//   return context;
// }

// Version 2

// import React, { createContext, useReducer, useContext, ReactNode } from "react";
// import { Habit } from "../types/habit";
// import { SQLiteDatabase, useSQLiteContext } from "expo-sqlite";

// type HabitAction =
//   | { type: "ADD_HABIT"; payload: Habit }
//   | { type: "UPDATE_HABIT"; payload: Habit }
//   | { type: "DELETE_HABIT"; payload: string }
//   | {
//       type: "TOGGLE_HABIT";
//       payload: { id: string; date: string; streak: number };
//     };

// function habitReducer(state: Habit[], action: HabitAction): Habit[] {
//   switch (action.type) {
//     case "ADD_HABIT":
//       return [...state, action.payload];

//     case "UPDATE_HABIT":
//       return state.map((habit) =>
//         habit.id === action.payload.id ? { ...habit, ...action.payload } : habit
//       );

//     case "DELETE_HABIT":
//       return state.filter((habit) => habit.id !== action.payload);

//     case "TOGGLE_HABIT":
//       return state.map((habit) => {
//         if (habit.id === action.payload.id) {
//           const updatedCompleted = habit.completed?.includes(
//             action.payload.date
//           )
//             ? habit.completed.filter((d) => d !== action.payload.date)
//             : [...(habit.completed || []), action.payload.date];

//           return {
//             ...habit,
//             completed: updatedCompleted,
//             streak: action.payload.streak,
//           };
//         }
//         return habit;
//       });

//     default:
//       return state;
//   }
// }

// interface HabitContextType {
//   habits: Habit[];
//   dispatch: React.Dispatch<HabitAction>;
// }

// const HabitContext = createContext<HabitContextType | undefined>(undefined);

// export function HabitProvider({ children }: { children: ReactNode }) {
//   const db = useSQLiteContext();
//   const [habits, dispatch] = useReducer(habitReducer, []);

//   const wrappedDispatch: React.Dispatch<HabitAction> = (action) => {
//     // Handle DB operations here
//     switch (action.type) {
//       case "ADD_HABIT": {
//         const h = action.payload;
//         db.runAsync(
//           `INSERT OR REPLACE INTO habits (id, name, createDate, completed, streak, difficulty, repeat, category)
//            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
//           [
//             h.id,
//             h.name,
//             h.createDate || new Date().toISOString(),
//             JSON.stringify(h.completed || []),
//             h.streak || 0,
//             h.difficulty,
//             JSON.stringify(h.repeat),
//             h.category,
//           ]
//         ).catch((err) => console.error("Failed to save habit to DB:", err));
//         break;
//       }

//       case "UPDATE_HABIT": {
//         const h = action.payload;
//         db.runAsync(
//           `UPDATE habits SET name = ?, createDate = ?, completed = ?, streak = ?, difficulty = ?, repeat = ?, category = ? WHERE id = ?`,
//           [
//             h.name,
//             h.createDate || new Date().toISOString(),
//             JSON.stringify(h.completed || []),
//             h.streak || 0,
//             h.difficulty,
//             JSON.stringify(h.repeat),
//             h.category,
//             h.id,
//           ]
//         ).catch((err) => console.error("Failed to update habit in DB:", err));
//         break;
//       }

//       case "DELETE_HABIT":
//         db.runAsync(`DELETE FROM habits WHERE id = ?`, [action.payload]).catch(
//           (err) => console.error("Failed to delete habit from DB:", err)
//         );
//         break;

//       case "TOGGLE_HABIT": {
//         const { id, date, streak } = action.payload;
//         const habit = habits.find((h) => h.id === id);
//         if (!habit) break;

//         const updatedCompleted = habit.completed?.includes(date)
//           ? habit.completed.filter((d) => d !== date)
//           : [...(habit.completed || []), date];

//         db.runAsync(
//           `UPDATE habits SET completed = ?, streak = ? WHERE id = ?`,
//           [JSON.stringify(updatedCompleted), streak, id]
//         ).catch((err) => console.error("Failed to update habit in DB:", err));
//         break;
//       }
//     }

//     dispatch(action); // update React state
//   };

//   return (
//     <HabitContext.Provider value={{ habits, dispatch: wrappedDispatch }}>
//       {children}
//     </HabitContext.Provider>
//   );
// }

// export function useHabits() {
//   const context = useContext(HabitContext);
//   if (!context)
//     throw new Error("useHabits must be used within a HabitProvider");
//   return context;
// }

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Habit } from "../types/habit";
import { useSQLiteContext } from "expo-sqlite";

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
        if (habit.id === action.payload.id) {
          const updatedCompleted = habit.completed?.includes(
            action.payload.date
          )
            ? habit.completed.filter((d) => d !== action.payload.date)
            : [...(habit.completed || []), action.payload.date];

          return {
            ...habit,
            completed: updatedCompleted,
            streak: action.payload.streak,
          };
        }
        return habit;
      });

    default:
      return state;
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
    const loadHabits = async () => {
      try {
        const rows = await db.getAllAsync<any>("SELECT * FROM habits");
        const parsed = rows.map((r) => ({
          ...r,
          completed: r.completed ? JSON.parse(r.completed) : [],
          repeat: r.repeat ? JSON.parse(r.repeat) : [],
        }));
        dispatch({ type: "SET_HABITS", payload: parsed });
      } catch (err) {
        console.error("Failed to load habits:", err);
      }
    };
    loadHabits();
  }, [db]);

  const wrappedDispatch: React.Dispatch<HabitAction> = (action) => {
    switch (action.type) {
      case "ADD_HABIT": {
        const h = action.payload;
        db.runAsync(
          `INSERT OR REPLACE INTO habits (id, name, createDate, completed, streak, difficulty, repeat, category)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            h.id,
            h.name,
            h.createDate || new Date().toISOString(),
            JSON.stringify(h.completed || []),
            h.streak || 0,
            h.difficulty,
            JSON.stringify(h.repeat),
            h.category,
          ]
        );
        break;
      }

      case "UPDATE_HABIT": {
        const h = action.payload;
        db.runAsync(
          `UPDATE habits SET name = ?, createDate = ?, completed = ?, streak = ?, difficulty = ?, repeat = ?, category = ? WHERE id = ?`,
          [
            h.name,
            h.createDate,
            JSON.stringify(h.completed || []),
            h.streak,
            h.difficulty,
            JSON.stringify(h.repeat),
            h.category,
            h.id,
          ]
        );
        break;
      }

      case "DELETE_HABIT":
        db.runAsync(`DELETE FROM habits WHERE id = ?`, [action.payload]);
        break;

      case "TOGGLE_HABIT": {
        const { id, date, streak } = action.payload;
        const habit = habits.find((h) => h.id === id);
        if (!habit) break;

        const updatedCompleted = habit.completed?.includes(date)
          ? habit.completed.filter((d) => d !== date)
          : [...(habit.completed || []), date];

        db.runAsync(
          `UPDATE habits SET completed = ?, streak = ? WHERE id = ?`,
          [JSON.stringify(updatedCompleted), streak, id]
        );
        break;
      }
    }

    dispatch(action); // always update context
  };

  return (
    <HabitContext.Provider value={{ habits, dispatch: wrappedDispatch }}>
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (!context)
    throw new Error("useHabits must be used within a HabitProvider");
  return context;
}
