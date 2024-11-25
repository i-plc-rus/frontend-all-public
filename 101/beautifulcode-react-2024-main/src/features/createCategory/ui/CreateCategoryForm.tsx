import { useCreateCategoryMutation } from '@/entities/category';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createCategoryFormScheme, type CreateCategoryFormScheme } from '../lib/CreateCategoryFormScheme';

const defaultValues: CreateCategoryFormScheme = {
  name: '',
  budget: 0,
};

export const CreateCategoryForm = () => {
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const form = useForm<CreateCategoryFormScheme>({
    resolver: zodResolver(createCategoryFormScheme),
    defaultValues,
    disabled: isLoading,
  });

  const onSubmitHandler = async (data: CreateCategoryFormScheme) => {
    await createCategory({ ...data, budget: Number(data.budget) });
  };

  return (
    <Form {...form}>
      <form className="grid gap-4 lg:grid-cols-[238px_238px_min-content]" onSubmit={form.handleSubmit(onSubmitHandler)}>
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input placeholder="New category name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="name"
        />
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category budget</FormLabel>
              <FormControl>
                <Input placeholder="Category budget" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="budget"
        />
        <Button className="lg:mt-8" type="submit" disabled={isLoading}>
          + Add category
        </Button>
      </form>
    </Form>
  );
};
