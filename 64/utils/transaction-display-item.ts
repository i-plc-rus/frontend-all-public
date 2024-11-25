export interface TransactionDisplayItem {
  dateHeaderTimestamp?: number;
  transaction?: Transaction;
}

export function getTransactionDisplayItemsByDate(
  transactions: Transaction[]
): TransactionDisplayItem[] {
  const result: TransactionDisplayItem[] = [];
  let curTruncatedTimestamp: number | null = null;
  const truncateToDay = (t: number) =>
    Math.trunc(t / MS_IN_ONE_DAY) * MS_IN_ONE_DAY;
  for (const transaction of transactions) {
    const truncatedTimestamp = truncateToDay(transaction.timestamp);
    if (truncatedTimestamp !== curTruncatedTimestamp) {
      curTruncatedTimestamp = truncatedTimestamp;
      result.push({
        dateHeaderTimestamp: curTruncatedTimestamp
      });
    }
    result.push({ transaction });
  }
  return result;
}

export function getTransactionDisplayItemsByAmount(
  transactions: Transaction[]
): TransactionDisplayItem[] {
  return transactions
    .map((transaction) => <TransactionDisplayItem>{ transaction })
    .sort(
      (a, b) =>
        Math.abs(b.transaction!.amount) - Math.abs(a.transaction!.amount)
    );
}
