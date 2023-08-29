import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import PageLayout from 'components/page-layout.component';

const SignIn = React.lazy(() => import('./sign-in.page'));

const AuthRoutes = () => {
  return (
    <Routes>
      <Route>
        <Route path="/sign-in" element={<SignIn />} />

        <Route path="*" element={<Navigate to="./sign-in" replace />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
