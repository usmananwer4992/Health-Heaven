import React, { memo } from "react";
import { Redirect } from "react-router-dom";
import { isLoggedIn } from "../utils";
import PublicRoutes from "./PublicRoutes";
import { getRoleId } from "../routeConfiguration/Roles";
/*
 * TODO: when user loggedIn he/she unable to goto public routes
 *  ie: ('/about', '/contact', 'any other public route')
 */
function Auth() {
  // TODO: temp logged-in check, update as per your app logic

  const role =
    JSON.parse(localStorage.getItem("user")) &&
    // JSON.parse(localStorage.getItem('user')). &&
    JSON.parse(localStorage.getItem("user")).roles[0];

  if (isLoggedIn() && role) {
    return 1 == getRoleId(role) ? (
      <Redirect to="/app/admin/dashboard" />
    ) : (
      <Redirect to="/app/partner/dashboard" />
    );
  } else {
    return <PublicRoutes />;
  }
}

export default memo(Auth);
