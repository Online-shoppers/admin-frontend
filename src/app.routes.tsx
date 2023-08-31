import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { getIsAuthenticated } from 'app/auth/store/auth.selectors';

import AuthRoutes from './app/auth/routes';
import ProductsRoutes from './app/products/routes';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return isAuthenticated ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <Navigate to="/auth/sign-in" />
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route
        element={
          <PrivateRoute>
            <Outlet />
          </PrivateRoute>
        }
      >
        <Route path="/products/*" element={<ProductsRoutes />} />
        <Route path="/" element={<Navigate to="/products/get" />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
