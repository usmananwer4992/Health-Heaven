const jwt = require("jsonwebtoken");
const db = require("../models");
const ResponseFormatService = require("../services/responseFormat.service");
const Users = db.users;
const Roles = db.roles;

const roleCheckMiddleware = () => async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res
      .status(401)
      .json(
        ResponseFormatService.responseUnauthorized(
          null,
          "Token not provided",
          false
        )
      );
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log({decoded})
    const user = await Users.findByPk(decoded.userId, {
      include: {
        model: Roles,
        as: "Role",
      },
    });

    if (!user) {
      res
        .status(401)
        .json(
          ResponseFormatService.responseUnauthorized(
            null,
            "User not found",
            false
          )
        );
      return;
    }
    const _userRole = user.Role;
    const slug = _userRole.dataValues.slug;
    let currentUserRole;
    if (decoded.role === "partner") {
      currentUserRole = slug.split("_");
      let currentUserRoleIndex = currentUserRole.indexOf("PARTNER");
      currentUserRole = currentUserRole[currentUserRoleIndex].toLowerCase();
      // Add Partner ID in request body if user has a partner role
      req.body = {...req.body, partnerId: decoded.partnerId}
      req.params = {...req.params, partnerId: decoded.partnerId}

    } else {
      currentUserRole = slug.split("_")[0].toLowerCase();
      currentUserRole = currentUserRole.split(" ")[0].toLowerCase();
    }

    if (currentUserRole === decoded.role) {
      next();
    } else {
      res
        .status(403)
        .json(
          ResponseFormatService.responseUnauthorized(
            null,
            "Access denied",
            false
          )
        );
    }
  } catch (error) {
    res
      .status(401)
      .json(
        ResponseFormatService.responseUnauthorized(
          null,
          { message: "Invalid Token!", isAuthenticated: false },
          false
        )
      );
  }
};

module.exports = roleCheckMiddleware;
