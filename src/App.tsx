import { ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { theme } from 'theme';

import AppRoutes from './app.routes';
import ErrorBoundary from './components/error-boundary.component';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
