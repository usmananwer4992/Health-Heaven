import apiService from "../services/apiService";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SET_SUCCESS_MESSAGE,
  LOGIN_URL,
  LOGOUT,
  SET_LOGOUT_SUCCESS_MESSAGE,
  RESET_ERROR_MESSAGE,
} from "./actionTypes";

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const resetErrorMessage = () => {
  return { type: RESET_ERROR_MESSAGE };
};

export const setSuccessMessage = (message) => ({
  type: SET_SUCCESS_MESSAGE,
  payload: message,
});

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const setLogoutSuccessMessage = (message) => {
  return {
    type: SET_LOGOUT_SUCCESS_MESSAGE,
    payload: message,
  };
};
export const loginUser =
  (email, password, navigate, location) => async (dispatch) => {
    let role = "partner";
    let portal = "app/partner/dashboard";
    const adminLogin = "nextgen/admin/login";
    if (location.pathname === "/nextgen/admin/login") {
      role = "SUPER-ADMIN";
      portal = "app/admin/dashboard";
    }else if(location.pathname === "/nextgen/staff/login"){
      role = "STAFF";
      portal = "app/admin/dashboard";
    }
    role = role.charAt(0).toUpperCase() + role.slice(1);
    try {
      const result = await apiService(
        {
          method: "post",
          url: LOGIN_URL,
          data: { email, password, role },
          hideConfirmationDialog: false,
        },
        dispatch
      );
      const { user, token } = result.response;

      // Set the token expiration to 30 minutes (1800 seconds)
      const expiresIn = 1800;
      const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("access_token_expiration", expirationTime);

      dispatch(setSuccessMessage("Login successful!"));
      dispatch(loginSuccess({ user, token }));

      setTimeout(() => {
        document.querySelector("body").classList =
          "light-skin sidebar-mini theme-success fixed";
        navigate.push("/" + portal);
      }, 700);
    } catch (error) {
      dispatch(loginFailure(error?.message));
      if (error?.status == 403) {
        setTimeout(() => {
          dispatch(loginFailure(""));
          role === "Partner"
            ? navigate.push("/" + adminLogin)
            : navigate.push("/");
        }, 700);
      }
    }
  };
