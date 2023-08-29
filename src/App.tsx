import { ThemeProvider } from '@mui/material';
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import LoadingIndicator from 'components/loading-indicator.component';

import AppRoutes from './app.routes';
import ErrorBoundary from './components/error-boundary.component';
import { theme } from './theme';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<LoadingIndicator />}>
          <Router>
            <AppRoutes />
          </Router>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
