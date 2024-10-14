import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function RouteLoader({ children }) {
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      // Check if the route change is due to user navigation
      if (action === "PUSH") {
        const delay = async () => {
          setIsLoadingRoute(true);

          // Simulate a delay for the route loader to appear while the route changes
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed

          setIsLoadingRoute(false);
        };

        delay();
      }
    });

    return () => {
      unlisten(); // Clean up the listener when the component unmounts
    };
  }, [history]);

  return (
    <>
      {isLoadingRoute && (
        <div id="routeLoader">
          <div className="spinner"></div>
        </div>
      )}
      {children} {/* Render the child component (route) */}
    </>
  );
}

export default RouteLoader;
