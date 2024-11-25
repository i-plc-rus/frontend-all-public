import { useGetCategoriesQuery } from '@/entities/category';
import { DataTable } from '@/shared/ui';
import { columns } from '../lib/columns';

export const CategoriesTable = () => {
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  return <DataTable columns={columns} data={categoriesData} />;
};
