export type Transaction = {
  id: string;
  categoryId: string;
  amount: number;
};

export type CreateTransactionRequest = {
  categoryId: string;
  amount: number;
};
