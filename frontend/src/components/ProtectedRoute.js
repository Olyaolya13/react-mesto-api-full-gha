import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.isLoggedIn ? <Component {...props} /> : <Navigate to="/sigh-in" replace />;
};

export default ProtectedRoute;
