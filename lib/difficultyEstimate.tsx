import { Habit } from "../types/habit";
import { useHabits } from "../store/habits";

export function estimateDifficulty(habit: Habit): "Easy" | "Medium" | "Hard" {
  const name = habit.name.toLowerCase();

  const hardKeywords = [
    "code",
    "coding",
    "program",
    "programming",
    "debug",
    "project",
    "freelance",
    "work",
    "business",
    "client",
    "job",
    "study 2h",
    "build",
    "record",
    "edit",
    "design",
    "research",
    "math",
    "algorithm",
    "portfolio",
    "write cv",
    "apply",
    "interview",
    "cold email",
    "script",
    "learn backend",
    "nextjs",
    "react",
    "deploy",
    "optimize",
    "framework",
    "firebase",
    "write article",
  ];

  const mediumKeywords = [
    "read",
    "study",
    "meditate",
    "cook",
    "prepare",
    "review",
    "learn",
    "plan",
    "devotion",
    "write",
    "draw",
    "practice",
    "study notes",
    "exercise",
    "workout",
    "walk 30",
    "youtube",
    "listen",
    "sermon",
    "meal prep",
    "clean room",
    "clean house",
    "language",
  ];

  const easyKeywords = [
    "walk",
    "drink",
    "water",
    "stretch",
    "clean",
    "tidy",
    "make bed",
    "wash face",
    "brush teeth",
    "eat",
    "snack",
    "breathe",
    "pray",
    "thank",
    "organize",
    "text",
    "call",
    "read bible",
    "journal",
    "gratitude",
    "rest",
    "relax",
    "music",
    "sunlight",
    "hydrate",
  ];

  let score = 0;
  if (hardKeywords.some((word) => name.includes(word))) score += 2;
  if (mediumKeywords.some((word) => name.includes(word))) score += 1;
  if (easyKeywords.some((word) => name.includes(word))) score -= 1;

  if (habit.repeat.type === "Daily") score += 2;
  else if (habit.repeat.type === "Custom")
    score += habit.repeat.days.length >= 4 ? 2 : 1;

  if (name.length < 5) score -= 1;

  if (score >= 4) return "Hard";
  if (score >= 2) return "Medium";
  return "Easy";
}
