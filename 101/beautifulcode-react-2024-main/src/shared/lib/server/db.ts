import { factory, primaryKey } from '@mswjs/data';

export const db = factory({
  category: {
    id: primaryKey(String),
    name: String,
    budget: Number,
  },
  transaction: {
    id: primaryKey(String),
    categoryId: String,
    amount: Number,
  },
});
