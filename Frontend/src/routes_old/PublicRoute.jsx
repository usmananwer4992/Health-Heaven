import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Login } from "../components/Login";

const PublicRoute = () => {
  const isAuthenticated = useSelector((state) => state.user.token !== null);

  return isAuthenticated ? <Redirect to="/" /> : <Login />;
};

export default PublicRoute;
