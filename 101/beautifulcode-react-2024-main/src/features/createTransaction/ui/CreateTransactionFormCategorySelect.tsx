import { useGetCategoriesQuery } from '@/entities/category';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { useFormContext } from 'react-hook-form';
import type { CreateTransactionFormScheme } from '../lib/CreateTransactionFormScheme';

export const CreateTransactionFormCategorySelect = () => {
  const { control } = useFormContext<CreateTransactionFormScheme>();
  const { data: categoriesData = [] } = useGetCategoriesQuery();

  return (
    <FormField
      control={control}
      name="categoryId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {!categoriesData.length ? (
                <div className="flex justify-center">
                  <p className="text-mute text-xs">No Categories found</p>
                </div>
              ) : (
                categoriesData.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
