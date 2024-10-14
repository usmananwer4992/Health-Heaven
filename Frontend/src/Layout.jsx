import React from "react";
import * as Icon from "react-feather";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Aside from "./components/aside/Aside";
import ControlSidebar from "./components/aside/ControlSidebar";
//import RouteLoader from "./RouteLoader"; // Import the RouteLoader component
import InitialLoader from "./InitialLoader";
import { API_BASE_URL } from "./config.js";
const Layout = ({ children }) => {
  const [sideBarRefresh,setSideBarRefresh] = React.useState(false);  
  return (
    <div className="wrapper">
      <InitialLoader />
      <Header Icon={Icon} sideBarRefresh={sideBarRefresh} setSideBarRefresh={setSideBarRefresh} />
      <Aside Icon={Icon} sideBarRefresh={sideBarRefresh } setSideBarRefresh={setSideBarRefresh} />
      <ControlSidebar />

      <div className="content-wrapper">
        {/* Wrap the children with RouteLoader */}
        <div className="route-loader-container">
          {/* <RouteLoader>{children}</RouteLoader> */}
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
