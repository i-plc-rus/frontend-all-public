import type { Transaction } from '@/entities/transaction';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];
