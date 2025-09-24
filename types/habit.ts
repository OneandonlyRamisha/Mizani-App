export type HabitDifficulty = "Easy" | "Medium" | "Hard";

export type HabitCategory =
  | "Faith"
  | "Focus"
  | "Fitness"
  | "Wisdom"
  | "Finance";

export type HabitRepeat =
  | { type: "Daily"; days: string[] }
  | { type: "Custom"; days: string[] }
  | { type: "Once"; days: string[]; selectedDate?: string };

export type Habit = {
  id: string;
  name: string;
  createDate: string;
  completed: string[];
  streak: number;
  difficulty: HabitDifficulty;
  repeat: HabitRepeat;
  category: HabitCategory;
};
