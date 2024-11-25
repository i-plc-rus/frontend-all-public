import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { CATEGORY_TAG, TRANSACTION_TAG } from './tags';

export const baseApi = createApi({
  tagTypes: [CATEGORY_TAG, TRANSACTION_TAG],
  reducerPath: 'api',
  baseQuery,
  endpoints: () => ({}),
});
