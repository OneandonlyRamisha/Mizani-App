export default function calculateStreak(
  completedDates: string[],
  repeat: any
): number {
  const sortedDates = [...completedDates].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );
  if (sortedDates.length === 0) return 0;

  let streak = 1;
  for (let i = sortedDates.length - 1; i > 0; i--) {
    const current = new Date(sortedDates[i]);
    const prev = new Date(sortedDates[i - 1]);

    let expectedPrevDate = new Date(current);

    if (repeat.type === "Daily") {
      expectedPrevDate.setDate(current.getDate() - 1);
    } else if (repeat.type === "Custom") {
      // step back one week to the same day
      expectedPrevDate.setDate(current.getDate() - 7);
    } else {
      // Once habit has no streak
      return 1;
    }

    const expectedStr = expectedPrevDate.toISOString().split("T")[0];
    const prevStr = prev.toISOString().split("T")[0];

    if (expectedStr === prevStr) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
