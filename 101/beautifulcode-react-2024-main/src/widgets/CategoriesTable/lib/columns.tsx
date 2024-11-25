import type { Category } from '@/entities/category';
import type { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'budget',
    header: 'Budget',
  },
];
