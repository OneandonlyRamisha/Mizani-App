export function formatDateKey(date: Date): string {
  return date.toLocaleDateString("en-CA").split("T")[0];
}

export function getShortWeekday(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function getHeaderLabel(date: Date): string {
  const weekday = date
    .toLocaleDateString("en-US", { weekday: "long" })
    .toLowerCase();
  const month = date
    .toLocaleDateString("en-US", { month: "long" })
    .toLowerCase();

  return `${weekday}, ${date.getDate()} ${month}`;
}

export function getYesterday(date: Date): Date {
  const previousDay = new Date(date);
  previousDay.setDate(previousDay.getDate() - 1);
  return previousDay;
}
