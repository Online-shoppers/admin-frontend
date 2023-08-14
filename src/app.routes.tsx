import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

interface PublicRouteProps {
  element: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => (
  <Suspense fallback={<div />}>{element}</Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoute element={<h1>home</h1>} />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
