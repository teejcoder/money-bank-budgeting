import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './AuthContext';

// PrivateRoute component for handling authenticated routes
const PrivateRoute = ({ component: Component, ...rest }) => {
  // Get authentication status from AuthContext
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        // Render the provided component if authenticated, otherwise redirect to sign-in
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
};

export default PrivateRoute;
