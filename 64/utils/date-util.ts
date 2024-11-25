export const MS_IN_ONE_DAY = 24 * 60 * 60 * 1000;

export function formatUtcDate(
  date: Date | number,
  { monthFormat = 'short' as 'short' | 'long' | null } = {}
): string {
  const currentYear = new Date().getFullYear();
  const localDate = utcDateToLocal(new Date(date));
  return localDate.toLocaleString('default', {
    day: 'numeric',
    month: monthFormat ?? undefined,
    year:
      monthFormat == undefined || currentYear === localDate.getFullYear()
        ? undefined
        : '2-digit'
  });
}

export function formatUtcMonth(date: Date | number): string {
  const currentYear = new Date().getFullYear();
  const localDate = utcDateToLocal(new Date(date));
  return localDate.toLocaleString('default', {
    month: 'long',
    year: currentYear === localDate.getFullYear() ? undefined : '2-digit'
  });
}

export function formatUtcDateRange(range: [Date, Date] | null | undefined) {
  if (!range) {
    return '';
  }
  if (
    range[0].getUTCFullYear() === range[1].getUTCFullYear() &&
    range[0].getUTCMonth() === range[1].getUTCMonth()
  ) {
    const start = formatUtcDate(range[0], { monthFormat: null });
    const end = formatUtcDate(range[1]);
    return `${start}-${end}`;
  }
  return range.map((d) => formatUtcDate(d)).join(' - ');
}

export function utcDateToLocal(value: Date): Date {
  return new Date(value.getTime() + value.getTimezoneOffset() * 60 * 1000);
}

export function localDateToUtc(value: Date): Date {
  return new Date(value.getTime() - value.getTimezoneOffset() * 60 * 1000);
}
