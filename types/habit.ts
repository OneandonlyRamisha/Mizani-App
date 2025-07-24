export type Habit = {
  id: string;
  name: string;
  createDate: string;
  completed: boolean;
  streak: number;
  difficulty: "Easy" | "Medium" | "Hard";
  repeat: { type: string; days: string[]; selectedDate?: string };
  category: "Faith" | "Discipline" | "Focus" | "Health" | "Wisdom";
};
