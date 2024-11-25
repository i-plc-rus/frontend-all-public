import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Paper, 
  Typography, 
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import { deleteCategory, updateCategory } from '../features/budgetSlice';

const CategoryList = () => {
  const categories = useSelector((state) => state.budget.categories);
  const dispatch = useDispatch();
  const [editingCategory, setEditingCategory] = useState(null);
  const [editName, setEditName] = useState('');
  const [editBudget, setEditBudget] = useState('');

  const handleEdit = (category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditBudget(category.budget.toString());
  };

  const handleUpdate = () => {
    if (editName && editBudget) {
      dispatch(updateCategory({
        id: editingCategory.id,
        name: editName,
        budget: parseFloat(editBudget)
      }));
      setEditingCategory(null);
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <CategoryRoundedIcon /> Categories
      </Typography>
      <List>
        {categories.map((category) => (
          <ListItem
            key={category.id}
            sx={{
              bgcolor: 'background.default',
              borderRadius: 2,
              mb: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemText
              primary={category.name}
              secondary={
                <Typography variant="body2" color="primary" fontWeight="bold">
                  ${category.budget.toFixed(2)}
                </Typography>
              }
            />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton aria-label="edit" color="primary" onClick={() => handleEdit(category)}>
                <EditRoundedIcon />
              </IconButton>
              <IconButton aria-label="delete" color="error" onClick={() => dispatch(deleteCategory(category.id))}>
                <DeleteOutlineRoundedIcon />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
      <Dialog open={!!editingCategory} onClose={() => setEditingCategory(null)}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Budget"
            type="number"
            fullWidth
            value={editBudget}
            onChange={(e) => setEditBudget(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingCategory(null)}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CategoryList;