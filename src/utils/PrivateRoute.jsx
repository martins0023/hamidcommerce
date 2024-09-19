import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  const location = useLocation();

  return isAuthenticated ? (
    Component
  ) : (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
