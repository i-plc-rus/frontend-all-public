import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper, useTheme, Box, Grid } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const Balance = () => {
  const theme = useTheme();
  const { categories, transactions } = useSelector((state) => state.budget);

  const totalBudget = categories.reduce((sum, category) => sum + (category.budget || 0), 0);
  const totalExpenses = transactions.reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
  const balance = totalBudget - totalExpenses;

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: { xs: 2, sm: 3 },
        background: theme.palette.mode === 'light'
          ? 'linear-gradient(145deg, #6C63FF, #FF6584)'
          : 'linear-gradient(145deg, #BB86FC, #03DAC6)',
        color: '#FFFFFF',
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', sm: 'flex-start' } }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.5rem', sm: '2rem' }, wordBreak: 'break-word' }}>
              ${balance.toFixed(2)}
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>Current Balance</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <TrendingUpIcon />
            <Box>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>${totalBudget.toFixed(2)}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Budget</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <TrendingDownIcon />
            <Box>
              <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' }, wordBreak: 'break-word' }}>${totalExpenses.toFixed(2)}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>Total Expenses</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Balance;