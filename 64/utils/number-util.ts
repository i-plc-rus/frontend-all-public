const amountFormat = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 2,
  useGrouping: true
});

export function formatAmount(value: number) {
  return amountFormat.format(value);
}
