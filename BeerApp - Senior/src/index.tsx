import './styles/global.css';
import { ThemeProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './router';
import { theme } from './styles/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<React.StrictMode>
  <CssBaseline />
  <ThemeProvider theme={theme}>
    <Router />
  </ThemeProvider>
</React.StrictMode>);
