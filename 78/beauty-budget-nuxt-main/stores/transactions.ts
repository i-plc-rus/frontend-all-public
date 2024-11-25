import { TransactionType } from '~/constants/transaction';
import type { ITotalTransactionSum, ITransaction } from '~/types/transaction';
import type { IChartCategory } from '~/types/chart';
import dayjs from 'dayjs';
import { getStorageStateItem, setStorageStateItem } from '~/utils/local-storage';

interface State {
  transactions: ITransaction[];
}

export const useTransactionsStore = defineStore('transactionsStore', {
  state: (): State => ({
    transactions: [],
  }),
  getters: {
    lastTransactions: (state) =>
      [...state.transactions]
        .sort(
          (prevTransaction, nextTransaction) =>
            dayjs(nextTransaction.created_at).valueOf() -
            dayjs(prevTransaction.created_at).valueOf()
        )
        .slice(0, 3),
    incomeCategories: (state): IChartCategory =>
      state.transactions.reduce((result: IChartCategory, currentTransaction: ITransaction) => {
        if (currentTransaction.type !== TransactionType.INCOME) {
          return result;
        }

        const isCategoryExist = currentTransaction.category in result;
        const categorySum = isCategoryExist
          ? currentTransaction.sum + result[currentTransaction.category]
          : currentTransaction.sum;

        return { ...result, [currentTransaction.category]: categorySum };
      }, {}),
    outcomeCategories: (state): IChartCategory =>
      state.transactions.reduce((result: IChartCategory, currentTransaction: ITransaction) => {
        if (currentTransaction.type !== TransactionType.OUTCOME) {
          return result;
        }

        const isCategoryExist = currentTransaction.category in result;
        const categorySum = isCategoryExist
          ? currentTransaction.sum + result[currentTransaction.category]
          : currentTransaction.sum;

        return { ...result, [currentTransaction.category]: categorySum };
      }, {}),
    categories: (state): string[] =>
      Array.from(new Set(state.transactions.map((item) => item.category))),
    totalTransactionsSum: (state): ITotalTransactionSum =>
      state.transactions.reduce(
        (result: ITotalTransactionSum, currentTransaction: ITransaction) => {
          const incomeTotalSum =
            currentTransaction.type === TransactionType.INCOME
              ? result.income + currentTransaction.sum
              : result.income;
          const outcomeTotalSum =
            currentTransaction.type === TransactionType.OUTCOME
              ? result.outcome + currentTransaction.sum
              : result.outcome;

          return {
            total: result.total + currentTransaction.sum,
            income: incomeTotalSum,
            outcome: outcomeTotalSum,
          };
        },
        { total: 0, income: 0, outcome: 0 }
      ),
    balance(): number {
      return (
        Math.abs(this.totalTransactionsSum.income) - Math.abs(this.totalTransactionsSum.outcome)
      );
    },
    incomeCategoriesSortedBySum() {
      return Object.entries(this.incomeCategories).sort(([, sum1], [, sum2]) => sum2 - sum1);
    },
    outcomeCategoriesSortedBySum() {
      return Object.entries(this.outcomeCategories).sort(([, sum1], [, sum2]) => sum2 - sum1);
    },
  },
  actions: {
    fetch() {
      this.transactions = getStorageStateItem('transactions') || [];
    },
    addTransaction(newTransaction: ITransaction) {
      const getIndexBySortedDate = (startIndex: number, endIndex: number): number => {
        let index = startIndex;

        if (
          (startIndex === endIndex && endIndex !== 0) ||
          dayjs(newTransaction.date).isAfter(dayjs(this.transactions[startIndex].date)) ||
          newTransaction.date === this.transactions[startIndex].date
        ) {
          return index;
        } else if (
          dayjs(newTransaction.date).isBefore(dayjs(this.transactions[endIndex].date)) ||
          newTransaction.date === this.transactions[endIndex].date
        ) {
          index = endIndex + 1;
        } else {
          index = getIndexBySortedDate(startIndex + 1, endIndex - 1);
        }

        return index || 0;
      };

      if (!this.transactions.length) {
        this.transactions.push(newTransaction);
      } else {
        const index = getIndexBySortedDate(0, this.transactions.length - 1);
        this.transactions.splice(index, 0, newTransaction);
      }
      this.updateStorageState(this.transactions);
    },
    deleteTransaction(id: string) {
      const newTransactions = this.transactions.filter((transaction) => transaction.id !== id);
      this.transactions = newTransactions;
      this.updateStorageState(this.transactions);
    },
    updateStorageState(updatedTransactions: ITransaction[]) {
      setStorageStateItem('transactions', updatedTransactions);
    },
  },
});
