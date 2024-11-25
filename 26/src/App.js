import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import Balance from './components/Balance';
import CategoryForm from './components/CategoryForm';
import CategoryList from './components/CategoryList';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Chart from './components/Chart';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
          h1: {
            fontWeight: 700,
          },
          h2: {
            fontWeight: 600,
          },
          button: {
            fontWeight: 600,
          },
        },
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#6C63FF' : '#BB86FC',
          },
          secondary: {
            main: mode === 'light' ? '#FF6584' : '#03DAC6',
          },
          background: {
            default: mode === 'light' ? '#F4F6F8' : '#121212',
            paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
          },
        },
        shape: {
          borderRadius: 16,
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                boxShadow: mode === 'light' 
                  ? '0 4px 6px rgba(0,0,0,0.1)'
                  : '0 4px 6px rgba(255,255,255,0.1)',
                transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: mode === 'light'
                    ? '0 6px 12px rgba(0,0,0,0.15)'
                    : '0 6px 12px rgba(255,255,255,0.15)',
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                textTransform: 'none',
                fontWeight: 600,
                padding: '10px 20px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: mode === 'light'
                    ? '0 4px 8px rgba(108, 99, 255, 0.2)'
                    : '0 4px 8px rgba(187, 134, 252, 0.2)',
                },
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                borderRadius: 12,
                '&:hover': {
                  boxShadow: mode === 'light'
                    ? '0 0 0 2px rgba(108, 99, 255, 0.2)'
                    : '0 0 0 2px rgba(187, 134, 252, 0.2)',
                },
                '&.Mui-focused': {
                  boxShadow: mode === 'light'
                    ? '0 0 0 2px rgba(108, 99, 255, 0.4)'
                    : '0 0 0 2px rgba(187, 134, 252, 0.4)',
                },
              },
            },
          },
        },
      }),
    [mode],
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            💰 Budget Manager
          </Typography>
          <IconButton onClick={toggleColorMode} color="inherit" sx={{ p: 1, borderRadius: 2 }}>
            {mode === 'dark' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Balance />
          <Box sx={{ display: 'flex', gap: 3, mt: 3, flexWrap: 'wrap' }}>
            <Box sx={{ flex: '1 1 300px' }}>
              <CategoryForm />
              <CategoryList />
            </Box>
            <Box sx={{ flex: '1 1 300px' }}>
              <TransactionForm />
              <TransactionList />
            </Box>
          </Box>
          <Chart />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;