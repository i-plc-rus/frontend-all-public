import React from 'react';
import { useSelector } from 'react-redux';
import { Pie, Bar } from 'react-chartjs-2';
import { Box, Typography, useTheme, Paper } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { PieChart, BarChart } from '@mui/icons-material';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Chart = () => {
  const { categories, transactions } = useSelector((state) => state.budget);
  const theme = useTheme();

  const categoryExpenses = categories.map(category => {
    const categoryTransactions = transactions.filter(t => t.categoryId === category.id);
    const totalExpense = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
    return { name: category.name, expense: totalExpense };
  });

  const pieData = {
    labels: categoryExpenses.map(c => c.name),
    datasets: [
      {
        data: categoryExpenses.map(c => c.expense),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
      },
    ],
  };

  const barData = {
    labels: categoryExpenses.map(c => c.name),
    datasets: [
      {
        label: 'Expenses',
        data: categoryExpenses.map(c => c.expense),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Budget',
        data: categories.map(c => c.budget),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: theme.palette.text.primary,
        },
      },
      tooltip: {
        bodyColor: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: theme.palette.text.primary,
        },
      },
      x: {
        ticks: {
          color: theme.palette.text.primary,
        },
      },
    },
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom align="center" sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <PieChart /> Expense Distribution
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ width: '45%', minWidth: 300 }}>
          <Typography variant="subtitle1" gutterBottom align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <PieChart fontSize="small" /> Pie Chart
          </Typography>
          <Pie data={pieData} options={options} />
        </Box>
        <Box sx={{ width: '45%', minWidth: 300 }}>
          <Typography variant="subtitle1" gutterBottom align="center" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <BarChart fontSize="small" /> Bar Chart
          </Typography>
          <Bar data={barData} options={options} />
        </Box>
      </Box>
    </Paper>
  );
};

export default Chart;