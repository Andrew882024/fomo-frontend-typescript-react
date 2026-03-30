/** Parse leading "Mar 30, 2026" from backend date strings for sorting and grouping. */
export function parseEventDateStart(dateStr: string): Date {
  const m = dateStr.match(/^([A-Za-z]+ \d+, \d{4})/);
  if (!m) return new Date(0);
  const t = Date.parse(m[1]);
  return Number.isNaN(t) ? new Date(0) : new Date(t);
}

export function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function formatDayHeading(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
