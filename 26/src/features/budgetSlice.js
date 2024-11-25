import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/api';

export const fetchCategories = createAsyncThunk('budget/fetchCategories', async () => {
  const response = await api.fetchCategories();
  return response.data;
});

export const addCategory = createAsyncThunk('budget/addCategory', async (category) => {
  const response = await api.addCategory(category);
  return response.data;
});

export const updateCategory = createAsyncThunk('budget/updateCategory', async (category) => {
  const response = await api.updateCategory(category.id, category);
  return response.data;
});

export const deleteCategory = createAsyncThunk('budget/deleteCategory', async (id, { dispatch, getState }) => {
  await api.deleteCategory(id);
  
  const { transactions } = getState().budget;
  const transactionsToDelete = transactions.filter(t => t.categoryId === id);
  
  for (let transaction of transactionsToDelete) {
    await dispatch(deleteTransaction(transaction.id));
  }

  return id;
});

export const fetchTransactions = createAsyncThunk('budget/fetchTransactions', async () => {
  const response = await api.fetchTransactions();
  return response.data;
});

export const addTransaction = createAsyncThunk('budget/addTransaction', async (transaction) => {
  const response = await api.addTransaction(transaction);
  return response.data;
});

export const updateTransaction = createAsyncThunk('budget/updateTransaction', async (transaction) => {
  const response = await api.updateTransaction(transaction.id, transaction);
  return response.data;
});

export const deleteTransaction = createAsyncThunk('budget/deleteTransaction', async (id) => {
  await api.deleteTransaction(id);
  return id;
});

const budgetSlice = createSlice({
  name: 'budget',
  initialState: {
    categories: [],
    transactions: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(c => c.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(c => c.id !== action.payload);
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(t => t.id !== action.payload);
      });
  },
});

export default budgetSlice.reducer;