import axios from "axios";
import Swal from "sweetalert2";
import { logout } from "../redux/authActions";
import { API_BASE_URL } from "../config";

const user = JSON.parse(localStorage.getItem("user"));
const role = user?.roles || [];

// Define the default login URL
let loginUrl = "/";

// Check if the user has the "PARTNER" role
if (role.length && !role.includes("PARTNER")) {
  loginUrl = "/nextgen/admin/login";
}

const refreshAccessToken = async (refreshToken) => {
  try {
    const response = await axios.post(API_BASE_URL + "/auth/oauth/token", {
      grant_type: "refresh_token",
      refresh_token: JSON.parse(refreshToken),
    });

    if (response.status === 200) {
      // Store the new access token and its expiration
      const newAccessToken = response.data.access_token;
      const expiresIn = 1800; // Token expiration duration
      const expirationTime = Math.floor(Date.now() / 1000) + expiresIn;
      localStorage.setItem("token", JSON.stringify(newAccessToken));
      localStorage.setItem("access_token_expiration", expirationTime);
      return newAccessToken;
    }
  } catch (error) {
    throw error;
  }
};

const apiService = async (config, dispatch) => {
  const hideLoadingIndicator = () => {
    setTimeout(() => {
      Swal.close();
    }, 500); // Delay for 500 milliseconds (adjust as needed)
  };

  const allowedMethods = ["POST", "PUT"]; // Define allowed methods here

  const isPostOrPutRequest = allowedMethods.includes(
    config.method.toUpperCase()
  );

  const hideConfirmDialog = config?.hideConfirmationDialog;
  let showConfirmDialog = true;
  if (typeof hideConfirmDialog !== "undefined" && hideConfirmDialog === false) {
    showConfirmDialog = false;
  }

  const showConfirmationDialog = async () => {
    if (isPostOrPutRequest && showConfirmDialog) {
      const result = await Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to save?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        return true; // User confirmed, proceed with the API request
      } else {
        // User canceled, do not proceed with the API request
        throw new Error("User canceled");
      }
    } else {
      // For non-POST and non-PUT requests, or login request, proceed without confirmation
      return true;
    }
  };

  const isAccessTokenExpiringSoon = () => {
    const accessTokenExpiration = getAccessTokenExpiration();
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return accessTokenExpiration - currentTime < 300; // Within the next 300 seconds
  };

  const getAccessTokenExpiration = () => {
    // Implement logic to get the expiration time of the access token
    return localStorage.getItem("access_token_expiration");
  };

  const getRefreshToken = () => {
    // Implement logic to get the refresh token
    return localStorage.getItem("token");
  };

  if (isAccessTokenExpiringSoon()) {
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      try {
        const refreshedToken = await refreshAccessToken(refreshToken);
        // if (refreshedToken) {
        //   // Update the access token in the request headers
        //   config.headers.Authorization = `Bearer ${refreshedToken}`;
        // }
      } catch (refreshError) {
        dispatch(logout());
        window.location.href = loginUrl;
        // Handle token refresh error, e.g., log out the user
        //handleTokenRefreshError(dispatch);
        return; // Exit the function to prevent the API call
      }
    }
  }

  try {
    if (await showConfirmationDialog()) {
      // Show the loading indicator only if the user confirmed
      // showLoadingIndicator();

      if (config.token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${config.token}`,
        };
      }

      const response = await axios(config);
      // hideLoadingIndicator();

      return response.data;
    }
  } catch (error) {
    if (error.message !== "User canceled") {
      // Handle errors, including API errors
      const customError = {
        status: error.response?.status || 500,
        message: error.response?.data?.message || "An error occurred",
        isAuthenticated: error.response?.data?.isAuthenticated || true,
      };

      if (error.response.status === 401) {
        // Access token has expired; attempt to refresh it
        const refreshToken = localStorage.getItem("token");
        if (refreshToken) {
          try {
            const refreshedToken = await refreshAccessToken(refreshToken);
            if (refreshedToken) {
              // Retry the original request with the new access token
              config.headers.Authorization = `Bearer ${refreshedToken}`;
              const response = await axios(config);
              return response.data;
            }
          } catch (refreshError) {
            // Handle any errors that occurred during token refresh
            console.error("Token refresh failed:", refreshError);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong. You have been logged out. Please log in again.",
            }).then(() => {
              // Dispatch the logout action
              dispatch(logout());

              // Redirect to the login page
              window.location.href = loginUrl; // Replace with the correct URL
            });
          }
        }
        if (customError.status === 401 && !customError.isAuthenticated) {
          // Show a message to the user
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong. You have been logged out. Please log in again.",
          }).then(() => {
            // Dispatch the logout action
            dispatch(logout());

            // Redirect to the login page
            window.location.href = loginUrl;
          });

          // Rethrow the error for further handling, if necessary
          throw customError;
        } else {
          hideLoadingIndicator();
        }

        // Handle other API errors here
        throw customError;
      } else {
        // Handle other API errors here
        throw customError;
      }
    } else {
      // User canceled, handle accordingly
      hideLoadingIndicator();
    }
  }
};

export default apiService;
