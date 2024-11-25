import { REQUIRED_MESSAGE } from '@/shared/lib';
import { z } from 'zod';

export const createTransactionFormScheme = z.object({
  amount: z.preprocess((a) => parseInt(z.string().parse(a), 10), z.number({ message: REQUIRED_MESSAGE })),
  categoryId: z.string().min(1, REQUIRED_MESSAGE),
});

export type CreateTransactionFormScheme = z.infer<typeof createTransactionFormScheme>;
