// src/lib/utils/date.ts
export function nowISO() { return new Date().toISOString(); }
export function toISO(d: Date | string) {
  return (d instanceof Date) ? d.toISOString() : new Date(d).toISOString();
}
export function hoursUntil(isoDate: string) {
  const diff = new Date(isoDate).getTime() - Date.now();
  return diff / (1000 * 60 * 60);
}
export function isUrgent(isoDate: string, thresholdHours = 48) {
  return hoursUntil(isoDate) <= thresholdHours;
}
export function isPastDue(isoDate: string) {
  return new Date(isoDate).getTime() < Date.now();
}
