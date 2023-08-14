import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './app.routes';
import ErrorBoundary from './components/error-boundary.component';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppRoutes />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
