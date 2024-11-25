import { baseApi } from '@/shared/api/baseApi.ts';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

export const appStore = configureStore({
  reducer: combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
  }),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

setupListeners(appStore.dispatch);
