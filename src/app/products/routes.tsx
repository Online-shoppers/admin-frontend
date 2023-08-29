import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import PageLayout from 'components/page-layout.component';

const ProductPage = React.lazy(() => import('./products.page'));

const ProductsRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PageLayout>
            <Outlet />
          </PageLayout>
        }
      >
        <Route path="/get" element={<ProductPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default ProductsRoutes;
