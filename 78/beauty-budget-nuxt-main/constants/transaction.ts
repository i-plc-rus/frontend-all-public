export const enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}

export const TransactionSign: Record<TransactionType, string> = {
  [TransactionType.INCOME]: '+',
  [TransactionType.OUTCOME]: '-',
};
