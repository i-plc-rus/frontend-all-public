import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  Paper,
  Fade,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import { deleteTransaction, updateTransaction } from '../features/budgetSlice';

const TransactionList = () => {
  const dispatch = useDispatch();
  const { transactions, categories } = useSelector((state) => state.budget);
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [editCategoryId, setEditCategoryId] = useState('');

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Deleted Category';
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const filteredTransactions = transactions.filter(transaction => 
    (transaction.categoryId && getCategoryName(transaction.categoryId).toLowerCase().includes(filter.toLowerCase())) ||
    (transaction.amount && transaction.amount.toString().includes(filter))
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date || 0) - new Date(a.date || 0);
    } else if (sortBy === 'amount') {
      return (b.amount || 0) - (a.amount || 0);
    }
    return 0;
  });

  const handleDelete = (id) => {
    dispatch(deleteTransaction(id));
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setEditAmount(transaction.amount.toString());
    setEditCategoryId(transaction.categoryId);
  };

  const handleUpdate = () => {
    if (editAmount && editCategoryId) {
      dispatch(updateTransaction({
        id: editingTransaction.id,
        amount: parseFloat(editAmount),
        categoryId: editCategoryId,
        date: editingTransaction.date
      }));
      setEditingTransaction(null);
    }
  };

  return (
    <Paper elevation={0} sx={{ mt: 3, overflow: 'hidden' }}>
      <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <ReceiptLongRoundedIcon /> Transactions
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <TextField
            label="Filter"
            variant="outlined"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            size="small"
            sx={{ flexGrow: 1 }}
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <Select
              labelId="sort-by-label"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="amount">Amount</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <List sx={{ p: 0 }}>
        {sortedTransactions.map((transaction, index) => (
          <Fade in={true} key={transaction.id || index}>
            <ListItem
              sx={{
                transition: 'background-color 0.3s',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemText 
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip 
                      label={`$${(transaction.amount || 0).toFixed(2)}`} 
                      color="primary" 
                      variant="outlined"
                    />
                    <Typography variant="body1">
                      {getCategoryName(transaction.categoryId)}
                    </Typography>
                  </Box>
                }
                secondary={formatDateTime(transaction.date)}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(transaction)}>
                  <EditRoundedIcon />
                </IconButton>
                <IconButton aria-label="delete" color="error" onClick={() => handleDelete(transaction.id)}>
                  <DeleteOutlineRoundedIcon />
                </IconButton>
              </Box>
            </ListItem>
          </Fade>
        ))}
      </List>
      <Dialog open={!!editingTransaction} onClose={() => setEditingTransaction(null)}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            value={editAmount}
            onChange={(e) => setEditAmount(e.target.value)}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="edit-category-label">Category</InputLabel>
            <Select
              labelId="edit-category-label"
              value={editCategoryId}
              onChange={(e) => setEditCategoryId(e.target.value)}
              label="Category"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingTransaction(null)}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TransactionList;