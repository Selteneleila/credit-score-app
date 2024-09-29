import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
