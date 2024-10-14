import React from "react";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import componentMapping from "../components/ComponentMapping";
import Partner from "../components/Partner/Partner";

const PrivateRoute = () => {
  // const isAuthenticated = useSelector((state) => state.user.token !== null);

  // const userData = useSelector((state) => state.user);
  // const navigate = useHistory();
  // const location = useLocation();
  // const shouldNavigateToAdmin = !location.pathname.includes("super-admin");

  // React.useEffect(() => {
  //   if (isAuthenticated && userData.user) {
  //     if (userData.user.roles && userData.user.roles.includes("super-admin")) {
  //       if (shouldNavigateToAdmin) {
  //         //history.push("/admin");
  //       }
  //     } else {
  //       history.push("/");
  //     }
  //   }
  // }, []);

  // let ComponentToRender = componentMapping[location.pathname] || Navigate;
  // if (typeof componentMapping[location.pathname] == "undefined") {
  //   ComponentToRender = Partner;
  // }

  // return isAuthenticated ? <ComponentToRender /> : <Navigate to="/login" />;
};

export default PrivateRoute;
