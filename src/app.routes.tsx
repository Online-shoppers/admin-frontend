import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AuthRoutes from './app/auth/routes';
import ProductsRoutes from './app/products/routes';

interface PublicRouteProps {
  element: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => (
  <Suspense fallback={<div />}>{element}</Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/products/*" element={<ProductsRoutes />} />
      <Route path="/" element={<Navigate to="/products/get" />} />
    </Routes>
  );
};

export default AppRoutes;
