import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  incomes: [],
  expenses: [],
  categories: [],
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    addIncome: (state, action) => {
      state.incomes.push(action.payload);
    },
    addExpense: (state, action) => {
      state.expenses.push(action.payload);
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
  },
});

export const { addIncome, addExpense, addCategory } = budgetSlice.actions;

export default budgetSlice.reducer;