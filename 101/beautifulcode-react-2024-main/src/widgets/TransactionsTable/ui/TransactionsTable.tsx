import { type Category, useGetCategoriesQuery } from '@/entities/category';
import { useGetTransactionsQuery } from '@/entities/transaction';
import { DataTable } from '@/shared/ui';
import { useMemo } from 'react';
import { columns } from '../lib/columns';

export const TransactionTable = () => {
  const { data: transactionsData = [] } = useGetTransactionsQuery();
  const { data: categoriesData = {} } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, error, isLoading }) => ({
      data: data?.reduce<Record<string, Category>>((acc, el) => {
        acc[el.id] = el;
        return acc;
      }, {}),
      error,
      isLoading,
    }),
  });

  const transactionsWithCategories = useMemo(
    () =>
      transactionsData.map((transaction) => ({
        ...transaction,
        category: categoriesData[transaction.categoryId].name,
      })),
    [categoriesData, transactionsData],
  );

  return <DataTable data={transactionsWithCategories} columns={columns} />;
};
