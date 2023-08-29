import { CssBaseline, GlobalStyles } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import LoadingIndicator from 'components/loading-indicator.component';

import { theme } from 'theme';

import AppRoutes from './app.routes';
import ErrorBoundary from './components/error-boundary.component';

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
          <Suspense fallback={<LoadingIndicator />}>
            <Router>
              <AppRoutes />
            </Router>
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </ErrorBoundary>
  );
}

export default App;
