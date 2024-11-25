import { useCreateTransactionMutation } from '@/entities/transaction';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createTransactionFormScheme, type CreateTransactionFormScheme } from '../lib/CreateTransactionFormScheme';
import { CreateTransactionFormCategorySelect } from './CreateTransactionFormCategorySelect';

const defaultValues: CreateTransactionFormScheme = {
  categoryId: '',
  amount: 0,
};

export const CreateTransactionForm = () => {
  const [createTransaction, { isLoading }] = useCreateTransactionMutation();

  const form = useForm<CreateTransactionFormScheme>({
    resolver: zodResolver(createTransactionFormScheme),
    defaultValues,
    disabled: isLoading,
  });

  const onSubmitHandler = async (data: CreateTransactionFormScheme) => {
    await createTransaction(data);
  };

  return (
    <Form {...form}>
      <form className="grid gap-4 lg:grid-cols-[238px_238px_min-content]" onSubmit={form.handleSubmit(onSubmitHandler)}>
        <CreateTransactionFormCategorySelect />
        <FormField
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Amount</FormLabel>
              <FormControl>
                <Input placeholder="Transaction Amount" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name="amount"
        />
        <Button className="lg:mt-8" type="submit" disabled={isLoading}>
          Add Transaction
        </Button>
      </form>
    </Form>
  );
};
