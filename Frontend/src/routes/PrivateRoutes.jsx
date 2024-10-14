import React, { Fragment } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { getAllowedRoutes, isLoggedIn } from "../utils";
import { PrivateRoutesConfig } from "../routeConfiguration";
// import { TopNav } from 'components/common';
import MapAllowedRoutes from "./MapAllowedRoutes";

function PrivateRoutes() {
  const match = useRouteMatch("/app");
  let allowedRoutes = [];
  if (isLoggedIn()) allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
  else return <Redirect to="/" />;
  return (
    <>
      {/* <TopNav routes={allowedRoutes} prefix={match.path} className="bg-white" /> */}
      <MapAllowedRoutes
        routes={PrivateRoutesConfig}
        basePath="/app"
        isAddNotFound
      />
    </>
  );
}

export default PrivateRoutes;
