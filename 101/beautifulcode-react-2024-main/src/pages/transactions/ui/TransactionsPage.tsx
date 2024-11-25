import { CreateTransactionForm } from '@/features/createTransaction';
import { TransactionTable } from '@/widgets/TransactionsTable';

export const TransactionsPage = () => {
  return (
    <section className="space-y-4">
      <CreateTransactionForm />
      <TransactionTable />
    </section>
  );
};
