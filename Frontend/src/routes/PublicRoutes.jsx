import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "../components/Login";

import NotFound from "../components/NotFound";
import InitialLoader from "../InitialLoader";
import Pogo from "../components/Pogo/Index";
import PogoThankYou from "../components/Pogo/ThankYou/Index";

function PublicRoutes() {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/">
          <InitialLoader />
          <Login />
        </Route>
        <Route exact path="/nextgen/admin/login">
          <InitialLoader />
          <Login />
        </Route>
        <Route exact path="/nextgen/staff/login">
          <InitialLoader />
          <Login />
        </Route>
        <Route exact path="/pogo-automatic">
          <InitialLoader />
          <Pogo />
        </Route>
        <Route exact path="/pogo-automatic/thank-you">
          <InitialLoader />
          <PogoThankYou />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Fragment>
  );
}

export default PublicRoutes;
