import type { TransactionType } from '~/constants/transaction';

export interface ITransaction {
  id: string;
  created_at: string;
  category: string;
  date: string;
  sum: number; // subunits
  type: TransactionType;
}

export interface ITotalTransactionSum {
  total: number;
  income: number;
  outcome: number;
}
