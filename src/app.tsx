import { CssBaseline, GlobalStyles } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './app.routes';
import ErrorBoundary from './components/error-boundary.component';
import { theme } from './theme';

function App() {
  return (
    <ErrorBoundary>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={{
              html: { height: '100%' },
              body: {
                height: '100%',
              },
              '#root': {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              },
            }}
          />
          <CssBaseline />
          <Router>
            <AppRoutes />
          </Router>
        </ThemeProvider>
      </StyledEngineProvider>
    </ErrorBoundary>
  );
}

export default App;
