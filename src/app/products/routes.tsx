import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import PageLayout from 'components/page-layout.component';

import { Accessory } from './accessory.page';
import { Beer } from './beer.page';
import { Snack } from './snack.page';

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
        <Route path="/beer/:productId" element={<Beer />} />
        <Route path="/snacks/:productId" element={<Snack />} />
        <Route path="/accessories/:productId" element={<Accessory />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default ProductsRoutes;
