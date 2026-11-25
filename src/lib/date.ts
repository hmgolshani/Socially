const rtf = new Intl.RelativeTimeFormat("en", { numeric: "always" });

const units = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
] as const;

export const formatTimeAgo = (date: string) => {
  const seconds = (new Date(date).getTime() - Date.now()) / 1000;

  for (const [unit, value] of units) {
    if (Math.abs(seconds) >= value) {
      return rtf.format(Math.round(seconds / value), unit);
    }
  }

  return "just now";
};

export const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
