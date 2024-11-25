import { CreateCategoryForm } from '@/features/createCategory';
import { CategoriesTable } from '@/widgets/CategoriesTable';

export const CategoriesPage = () => {
  return (
    <section className="space-y-4">
      <CreateCategoryForm />
      <CategoriesTable />
    </section>
  );
};
