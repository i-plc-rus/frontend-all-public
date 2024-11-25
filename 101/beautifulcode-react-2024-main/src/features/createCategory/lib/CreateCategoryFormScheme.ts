import { REQUIRED_MESSAGE } from '@/shared/lib';
import * as z from 'zod';

export const createCategoryFormScheme = z.object({
  name: z.string().min(1, REQUIRED_MESSAGE),
  budget: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number({ message: REQUIRED_MESSAGE }).min(1, 'Budget must be greater than 0'),
  ),
});

export type CreateCategoryFormScheme = z.infer<typeof createCategoryFormScheme>;
