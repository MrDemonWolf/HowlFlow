export function getToday(): string {
  return new Date().toISOString().split("T")[0]!;
}

export function isToday(date: string): boolean {
  return date === getToday();
}

export function formatTime(hhMM: string): string {
  const [h, m] = hhMM.split(":");
  const hour = parseInt(h!, 10);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${display}:${m} ${suffix}`;
}

export function secondsToMMSS(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function getTimeOfDayLabel(hour: number): {
  label: string;
  emoji: string;
} {
  if (hour < 6) return { label: "Night Watch", emoji: "\u{1F31A}" };
  if (hour < 12) return { label: "Morning Hunt", emoji: "\u{1F305}" };
  if (hour < 17) return { label: "Afternoon Patrol", emoji: "\u{2600}\uFE0F" };
  if (hour < 21) return { label: "Evening Howl", emoji: "\u{1F319}" };
  return { label: "Night Den", emoji: "\u{1F43A}" };
}
