import { CssBaseline, GlobalStyles } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import jwt_decode from 'jwt-decode';
import { Suspense, useCallback, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import storage from 'storage/admin';

import { refreshTokens } from 'app/auth/api/refresh-tokens.api';
import { ACCESS_TOKEN_KEY, EXPIRATION_DATE_KEY, REFRESH_TOKEN_KEY } from 'app/auth/constants';
import { UserSessionSchema } from 'app/auth/schemas/user-session.schema';
import { authenticate, logout } from 'app/auth/store/auth.slice';

import LoadingIndicator from 'components/loading-indicator.component';

import { useAppDispatch } from 'store';

import { theme } from 'theme';

import AppRoutes from './app.routes';
import ErrorBoundary from './components/error-boundary.component';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnMount: false, refetchOnWindowFocus: false } },
});

// in miliseconds
const FIVE_MINUTES = 1000 * 60 * 5;

function App() {
  const refOnce = useRef(false);

  const dispatch = useAppDispatch();

  const handleAuthenticate = (accessToken: string, refreshToken: string | null) => {
    const payload = jwt_decode(accessToken);
    const userSession = UserSessionSchema.validateSync(payload);

    // in seconds
    const expirationDate = userSession.exp;

    storage.set(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) storage.set(REFRESH_TOKEN_KEY, refreshToken);
    storage.set(EXPIRATION_DATE_KEY, expirationDate);

    dispatch(authenticate(userSession));
  };

  const handleLogout = () => {
    storage.remove(ACCESS_TOKEN_KEY);
    storage.remove(REFRESH_TOKEN_KEY);
    storage.remove(EXPIRATION_DATE_KEY);

    dispatch(logout());
  };

  const onRefreshTokens = useCallback(async (accessToken: string, refreshToken: string) => {
    try {
      const { data } = await refreshTokens({
        access_token: String(accessToken),
        refresh_token: String(refreshToken),
      });

      handleAuthenticate(data.access_token, data.refresh_token);
    } catch (err) {
      console.error(err);
      handleLogout();
    }
  }, []);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      // in miliseconds
      const nowUtc = new Date().getTime();

      // in seconds
      const expirationDate = Number(storage.get(EXPIRATION_DATE_KEY)) || 0;

      const refreshToken = storage.get(REFRESH_TOKEN_KEY);
      const accessToken = storage.get(ACCESS_TOKEN_KEY);

      const shouldRefresh = nowUtc > expirationDate * 1000 - FIVE_MINUTES;
      const hasAccessToken = !!accessToken;
      const hasRefreshToken = !!refreshToken;

      if (hasRefreshToken && hasAccessToken && (shouldRefresh || !refOnce.current)) {
        onRefreshTokens(accessToken, refreshToken);

        refOnce.current = true;
      }
    };

    const accessToken = storage.get(ACCESS_TOKEN_KEY);
    const refreshToken = storage.get(REFRESH_TOKEN_KEY);

    if (accessToken) {
      const payload = jwt_decode(accessToken);
      const userSession = UserSessionSchema.validateSync(payload);
      handleAuthenticate(accessToken, refreshToken);

      const now = Date.now();

      const timeout = userSession.exp * 1000 - now - FIVE_MINUTES || 0;

      const timeoutId = setTimeout(checkTokenExpiration, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      handleLogout();
    }
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
