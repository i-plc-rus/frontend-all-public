import { defineStore } from 'pinia';

export const useTransactionSortStore = defineStore(
  'transactionSortStore',
  () => {
    const transactionSortCookie = useCookie('transactionSort', {
      default: () => 'date' as TransactionSortOption
    });
    const sort = computed(() => transactionSortCookie.value);

    const select = (option: TransactionSortOption) => {
      transactionSortCookie.value = option;
    };
    return { sort, select };
  }
);

const transactionSortOptions = ['date', 'amount'] as const;
export type TransactionSortOption = (typeof transactionSortOptions)[number];
