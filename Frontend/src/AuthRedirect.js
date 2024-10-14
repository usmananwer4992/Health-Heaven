import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isTokenExpired } from "./utils/auth";

function AuthRedirect() {
  const navigate = useHistory();

  useEffect(() => {
    if (isTokenExpired()) {
      history.push("/login");
    }
  }, [navigate]);

  return null; // This component doesn't render anything
}

export default AuthRedirect;
