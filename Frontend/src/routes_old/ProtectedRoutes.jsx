import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ element, isAuthenticated, redirectTo, ...rest }) => (
  <Route
    {...rest}
    element={isAuthenticated ? element : <Redirect to={redirectTo} />}
  />
);

export default ProtectedRoute;
