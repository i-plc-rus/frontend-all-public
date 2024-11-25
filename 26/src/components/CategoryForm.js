import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { addCategory } from '../features/budgetSlice';

const CategoryForm = () => {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && budget) {
      dispatch(addCategory({ name, budget: parseFloat(budget) }));
      setName('');
      setBudget('');
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <AddCircleOutlineRoundedIcon /> Add Category
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="outlined"
            required
          />
          <TextField
            label="Budget"
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            fullWidth
            variant="outlined"
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            startIcon={<AddCircleOutlineRoundedIcon />}
            sx={{ mt: 2 }}
          >
            Add Category
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CategoryForm;