import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import { getIsAuthenticated } from './store/auth.selectors';

const SignIn = React.lazy(() => import('./sign-in.page'));

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated]);

  return <React.Fragment>{children}</React.Fragment>;
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthRoute>
            <Outlet />
          </AuthRoute>
        }
      >
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<Navigate to="./sign-in" replace />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
