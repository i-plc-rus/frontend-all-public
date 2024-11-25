import { baseApi, CATEGORY_TAG, TRANSACTION_TAG } from '@/shared/api';
import type { CreateTransactionRequest, Transaction } from '../model/types';

export const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query<Transaction[], void>({
      query: () => ({
        url: `/transaction`,
      }),
      providesTags: [TRANSACTION_TAG],
    }),
    createTransaction: build.mutation<Transaction, CreateTransactionRequest>({
      query: (body) => ({
        url: `/transaction`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [TRANSACTION_TAG, CATEGORY_TAG],
    }),
  }),
});

export const { useCreateTransactionMutation, useGetTransactionsQuery } = transactionApi;
