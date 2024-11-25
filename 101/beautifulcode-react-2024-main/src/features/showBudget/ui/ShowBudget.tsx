import { useGetCategoriesQuery } from '@/entities/category';
import { useMemo } from 'react';
import { currencyFormatter } from '../lib/currencyFormatter';

export const ShowBudget = () => {
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  const budget = useMemo(() => {
    return currencyFormatter.format(categoriesData.reduce((acc, el) => acc + el.budget, 0));
  }, [categoriesData]);

  return (
    <p>
      Budget: <b>{budget}</b>
    </p>
  );
};
