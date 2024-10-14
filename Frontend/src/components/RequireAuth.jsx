import { useLocation, Redirect, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const authenticated = localStorage.getItem("user") !== null ? true : false;
  const location = useLocation();
  return authenticated ? (
    <Outlet />
  ) : (
    <Redirect to="/login" state={{ from: location }} replace />
  );
};
export default RequireAuth;
