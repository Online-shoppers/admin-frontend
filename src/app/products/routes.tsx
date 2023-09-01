import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import PageLayout from 'components/page-layout.component';

import { AccessoryCreate } from './accessory-create.page';
import { Accessory } from './accessory.page';
import { BeerCreate } from './beer-create.page';
import { Beer } from './beer.page';
import { SnackCreate } from './snack-create.page';
import { Snack } from './snack.page';

const ProductsPage = React.lazy(() => import('./products.page'));

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
        <Route path="/" element={<ProductsPage />} />
        <Route path="/beer/:productId" element={<Beer />} />
        <Route path="/snacks/:productId" element={<Snack />} />
        <Route path="/accessories/:productId" element={<Accessory />} />

        {/*<Route path="*" element={<Navigate to="./" replace />} />*/}
        {/*<Route path="/beer/create" element={<BeerCreate />} />*/}
        {/*<Route path="/snacks/create" element={<SnackCreate />} />*/}
        {/*<Route path="/accessories/create" element={<AccessoryCreate />} />*/}
        {/*<Route path="*" element={<Navigate to="/" replace />} />*/}
      </Route>
    </Routes>
  );
};

export default ProductsRoutes;
