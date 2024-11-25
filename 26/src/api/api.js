import axios from 'axios';


const API_URL = 'http://localhost:3001';

export const fetchCategories = () => axios.get(`${API_URL}/categories`);
export const addCategory = (category) => axios.post(`${API_URL}/categories`, category);
export const updateCategory = (id, category) => axios.put(`${API_URL}/categories/${id}`, category);
export const deleteCategory = (id) => axios.delete(`${API_URL}/categories/${id}`);

export const fetchTransactions = () => axios.get(`${API_URL}/transactions`);
export const addTransaction = (transaction) => axios.post(`${API_URL}/transactions`, transaction);
export const updateTransaction = (id, transaction) => axios.put(`${API_URL}/transactions/${id}`, transaction);
export const deleteTransaction = (id) => axios.delete(`${API_URL}/transactions/${id}`);