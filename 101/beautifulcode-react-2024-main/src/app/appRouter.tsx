import { layoutWithSidebar } from '@/app/layouts/baseLayout';
import { CategoriesPage } from '@/pages/categories';
import { HomePage } from '@/pages/home';
import { TransactionsPage } from '@/pages/transactions';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';

export const appRouter = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={layoutWithSidebar}>
          <Route element={<HomePage />} path="/" />
          <Route element={<CategoriesPage />} path="/categories" />
          <Route element={<TransactionsPage />} path="/transactions" />
        </Route>

        <Route element={<Navigate to="/" />} path="*" />
      </Route>,
    ),
  );
