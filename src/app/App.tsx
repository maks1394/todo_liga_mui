import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme } from './theme';
import { Router } from 'router/index';

export const App = () => {
  return (
    <Theme>
      <CssBaseline />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Theme>
  );
};
