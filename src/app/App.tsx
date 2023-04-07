import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './theme';
import { Router } from 'router/index';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
};
