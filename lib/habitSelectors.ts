import { Habit } from "../types/habit";
import { formatDateKey, getShortWeekday } from "./dateUtils";

export function selectHabitsForDate(
  habits: Habit[],
  isoDate: string
): Habit[] {
  const dayName = getShortWeekday(isoDate);

  return habits.filter((habit) => {
    if (!habit.repeat) return false;

    const createdOn = habit.createDate || formatDateKey(new Date());
    if (createdOn > isoDate) return false;

    switch (habit.repeat.type) {
      case "Daily":
        return true;
      case "Once":
        return habit.repeat.selectedDate === isoDate;
      case "Custom":
        return habit.repeat.days?.includes(dayName);
      default:
        return false;
    }
  });
}

export function countCompletedHabits(
  habits: Habit[],
  isoDate: string
): number {
  return habits.reduce((total, habit) => {
    return habit.completed?.includes(isoDate) ? total + 1 : total;
  }, 0);
}

export function mapUniqueCompletionDaysByPillar(
  habits: Habit[]
): Record<string, number> {
  const uniqueDays: Record<string, Set<string>> = {};

  habits.forEach((habit) => {
    if (!habit.category) return;

    if (!uniqueDays[habit.category]) {
      uniqueDays[habit.category] = new Set();
    }

    habit.completed?.forEach((date) => {
      uniqueDays[habit.category]?.add(date);
    });
  });

  return Object.entries(uniqueDays).reduce<Record<string, number>>(
    (acc, [pillar, dates]) => {
      acc[pillar] = dates.size;
      return acc;
    },
    {}
  );
}
