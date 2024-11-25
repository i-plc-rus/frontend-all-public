import { __serverDatabase, env } from '@/shared/lib';
import { http, HttpResponse, type DefaultBodyType, type PathParams } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import type { CreateTransactionRequest, Transaction } from '../../model/types';

export const transactionHandlers = [
  http.get<PathParams, DefaultBodyType, Transaction[]>(`${env.VITE_API_ENDPOINT}/transaction`, () => {
    const transactions = __serverDatabase.transaction.getAll();
    return HttpResponse.json(transactions);
  }),
  http.post<PathParams, CreateTransactionRequest, Transaction>(
    `${env.VITE_API_ENDPOINT}/transaction`,
    async ({ request }) => {
      const body = await request.json();
      const newTransaction = __serverDatabase.transaction.create({ ...body, id: uuidv4() });

      __serverDatabase.category.update({
        where: { id: { equals: body.categoryId } },
        data: { budget: (prevBudget) => prevBudget - body.amount },
      });

      return HttpResponse.json(newTransaction);
    },
  ),
];
