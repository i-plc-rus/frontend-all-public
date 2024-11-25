import type { Category, CreateCategoryRequest } from '@/entities/category';
import { __serverDatabase, env } from '@/shared/lib';
import type { DefaultBodyType, PathParams } from 'msw';
import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';

export const categoryHandlers = [
  http.get<PathParams, DefaultBodyType, Category[]>(`${env.VITE_API_ENDPOINT}/category`, () => {
    const categories = __serverDatabase.category.getAll();
    return HttpResponse.json(categories);
  }),
  http.post<PathParams, CreateCategoryRequest, Category>(`${env.VITE_API_ENDPOINT}/category`, async ({ request }) => {
    const body = await request.json();
    const newCategory = __serverDatabase.category.create({ ...body, id: uuidv4() });

    return HttpResponse.json(newCategory);
  }),
];
