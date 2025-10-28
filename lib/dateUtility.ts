export function isSameDate(
  date1: Date | undefined,
  date2: Date | undefined
): boolean {
  if (!date1 && !date2) return true;
  if (!date1 || !date2) return false;

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
export function formatDate(date: Date | string): string {
  if (!date || date === "") return "";

  if (typeof date === "string") date = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
export function getDate(days: number = 0) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}
