export const isTokenExpired = () => {
  const token = localStorage.getItem("token"); // Replace with your actual token key

  if (!token) {
    return true; // Token is not present, consider it expired
  }

  try {
    const tokenData = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const currentTime = Math.floor(Date.now() / 1000); // Current timestamp in seconds

    return tokenData.exp < currentTime; // Check if token has expired
  } catch (error) {
    // Handle decoding errors or invalid tokens
    return true;
  }
};

