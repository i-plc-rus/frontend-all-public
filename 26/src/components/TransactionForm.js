import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, Paper, Typography, MenuItem } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { addTransaction } from '../features/budgetSlice';

const TransactionForm = () => {
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.budget.categories);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && categoryId) {
      dispatch(addTransaction({ amount: parseFloat(amount), categoryId, date: new Date().toISOString() }));
      setAmount('');
      setCategoryId('');
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AddCircleOutlineRoundedIcon /> Add Transaction
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            select
            label="Category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            fullWidth
            variant="outlined"
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            startIcon={<AddCircleOutlineRoundedIcon />}
            sx={{ mt: 2 }}
          >
            Add Transaction
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TransactionForm;