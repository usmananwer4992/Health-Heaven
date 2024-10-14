import React from "react";
import { BarLoader } from "react-spinners";

const Loader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div
          style={{
            top: "5px", // Make sure to include "px" here
            right: 0,
            padding: "10px",
            zIndex: 9999,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              boxSizing: "border-box",
              padding: "10px",
              borderRadius: "4px",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <BarLoader color="#1dbfc1" width={1170} />
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
