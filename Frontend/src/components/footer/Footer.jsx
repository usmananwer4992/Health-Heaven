import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#f8f8f8", // Set your desired background color
    textAlign: "center",
    padding: "10px", // Adjust the padding as needed
  };

  return (
    <footer style={footerStyle}>
      &copy; {currentYear} <a href="/">Health-Havenrx</a>. All Rights Reserved.
    </footer>
  );
};

export default Footer;
