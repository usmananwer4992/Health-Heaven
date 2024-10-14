module.exports = (app) => {
  const authentication = require("../controller/authentication.controller.js");
  const express = require("express");
  const oauth2Server = require("../oauth2-server-file");
  var router = express.Router();
  router.post("/", express.json(), authentication.oAuthenticate);
  // OAuth2 Token Exchange Endpoint
  router.post("/oauth/token", (req, res, next) => {
    const grantType = req.body.grant_type;
    if (grantType === "refresh_token") {
      // Handle the refresh token grant type
      return oauth2Server.token()(req, res, next);
    } else {
      // Unsupported grant type
      return res.status(400).json({
        error: "unsupported_grant_type",
        error_description: "Unsupported grant type: " + grantType,
      });
    }
  });
  app.use("/api/auth", router);
};
