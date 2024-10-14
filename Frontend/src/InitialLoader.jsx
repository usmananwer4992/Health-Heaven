import React, { useEffect, useState } from "react";

function InitialLoader() {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Simulate a delay for the initial loader when the application is loaded
    if (isInitialLoad) {
      const delay = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Adjust the delay as needed
        setIsInitialLoad(false);
      };

      delay();
    }
  }, [isInitialLoad]);

  if (isInitialLoad) {
    return <div id="loader"></div>;
  }

  return null;
}

export default InitialLoader;
