import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Habit } from "../types/habit";

type HabitAction =
  | { type: "ADD_HABIT"; payload: Habit }
  | { type: "UPDATE_HABIT"; payload: Habit }
  | { type: "DELETE_HABIT"; payload: string }
  | {
      type: "TOGGLE_HABIT";
      payload: { id: string; date: string; streak: number };
    };

function habitReducer(state: Habit[], action: HabitAction): Habit[] {
  switch (action.type) {
    case "ADD_HABIT":
      return [...state, action.payload];
    case "UPDATE_HABIT":
      return state.map((habit) =>
        habit.id === action.payload.id ? { ...habit, ...action.payload } : habit
      );
    case "DELETE_HABIT":
      return state.filter((habit) => habit.id !== action.payload);
    case "TOGGLE_HABIT":
      return state.map((habit) =>
        habit.id === action.payload.id
          ? {
              ...habit,
              completed: habit.completed?.includes(action.payload.date)
                ? habit.completed.filter((d) => d !== action.payload.date)
                : [...(habit.completed || []), action.payload.date],
              streak: action.payload.streak,
            }
          : habit
      );
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
  const [habits, dispatch] = useReducer(habitReducer, []);
  return (
    <HabitContext.Provider value={{ habits, dispatch }}>
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
