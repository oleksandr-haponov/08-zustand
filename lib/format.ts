// /lib/format.ts
// Детерминированный формат даты "dd.MM.yyyy" в UTC — одинаково на сервере и клиенте,
// чтобы не ловить hydration mismatch из-за локалей.
export function formatDateUTC(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const dd = String(d.getUTCDate()).padStart(2, "0");
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const yyyy = d.getUTCFullYear();
  return `${dd}.${mm}.${yyyy}`;
}
