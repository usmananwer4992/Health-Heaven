// authentication.controller.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const db = require("../models");
const Users = db.users;
const Roles = db.roles;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const ResponseFormatService = require("../services/responseFormat.service");

// Function to generate access tokens
function generateAccessToken(user) {
  const expiresIn = "30m";
  const _userRole = user.Role;
  const currentUserRole = _userRole.slug.split("_")[0].toLowerCase();
  return jwt.sign(
    {
      username: user.email,
      role: currentUserRole,
      userId: user.id,
      partnerId: user.partnerId,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: expiresIn }
  );
}

// Configure Passport local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await Users.findOne({
          where: { email },
          include: [
            { model: db.partners },
            {
              model: Roles,
              as: "Role",
              include: [
                {
                  model: db.permissions,
                  as: "permission",
                  attributes: [["slug", "permission"]],
                },
              ],
            },
          ],
          paranoid: false,
        });

        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user); // This passes the user to the authenticate callback
      } catch (error) {
        return done(error);
      }
    }
  )
);

const oAuthenticate = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .send(
          ResponseFormatService.responseInternalServer(
            null,
            err.message || "Something went wrong!",
            false
          )
        );
    }

    if (!user) {
      return res
        .status(401)
        .send(
          ResponseFormatService.responseUnauthorized(
            null,
            { password: "Invalid email or password!", isAuthenticated: false },
            false
          )
        );
    }

    if (user.deletedAt || (user.Partner && user.Partner.deletedAt)) {
      // User or Partner is soft-deleted
      return res.status(404).send(
        ResponseFormatService.responseNotFound(
          null,
          {
            email:
              "User account is deactivated. Please contact support for assistance.",
          },
          false
        )
      );
    }
    const { role } = req.body;
    const userRole = role || 'PARTNER';
    const _userRole = user.Role;
    const currentUserRole = _userRole.slug.split("_")[0].toLowerCase();
    if (currentUserRole !== userRole.toLowerCase()) {
      return res
        .status(403)
        .send(
          ResponseFormatService.responseUnauthorized(
            null,
            { email: "Forbidden access" },
            false
          )
        );
    }
    const refresh_token = jwt.sign(
      { userId: user.id, clientId: "your-client-id" },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30m" } // Set the expiration time as needed
    );

    let response ={};
    if(role !== undefined){
      response = {
        user: {
          id: user.id,
          email: user.email,
          roleId: user.roleId,
          token: generateAccessToken(user),
          refresh_token: refresh_token,
          roles: [currentUserRole],
          permissions: user.Role.permission,
          partnerId: user.partnerId,
        },
        token: generateAccessToken(user),
      };
    }else{
       response = {
        user: {
          id: user.id,
          email: user.email,
          // token: role !== undefined && generateAccessToken(user),
          // refresh_token: role !== undefined  && refresh_token,
          roles: [currentUserRole],
          // permissions: role !== undefined  && user.Role.permission,
        },
        // token: role !== undefined && generateAccessToken(user),
      };
    }
    

    if (user.Partner && user.Partner.liveKey) {
      response.user.liveKey = user.Partner.liveKey;
    }

    return res
      .status(200)
      .send(ResponseFormatService.responseOk(response, "User LoggedIn!", true));
  })(req, res, next);
};

const authenticate = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const userRole = role;
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: false },
      }),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    }).with("email", "password");

    const { error } = schema.validate({
      email: email,
      password: password,
    });
    const validationErrors = {};
    if (error) {
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      return res
        .status(400)
        .send(
          ResponseFormatService.responseNotFound(null, validationErrors, false)
        );
    }

    const foundUser = await Users.findOne({
      where: { email },
      include: [
        { model: db.partners },
        {
          model: Roles,
          as: "Role",
          include: [
            {
              model: db.permissions,
              as: "permission",
              attributes: [["slug", "permission"]],
            },
          ],
        },
      ],
      paranoid: false,
    });
    if (!foundUser) {
      return res
        .status(404)
        .send(
          ResponseFormatService.responseNotFound(
            null,
            { email: "Email is not valid." },
            false
          )
        );
    }

    if (
      foundUser.deletedAt ||
      (foundUser.Partner && foundUser.Partner.deletedAt)
    ) {
      // User or Partner is soft-deleted
      return res.status(404).send(
        ResponseFormatService.responseNotFound(
          null,
          {
            email:
              "User account is deactivated. Please contact support for assistance.",
          },
          false
        )
      );
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res
        .status(401)
        .send(
          ResponseFormatService.responseUnauthorized(
            null,
            { password: "Invalid Password!", isAuthenticated: false },
            false
          )
        );
    }

    const _userRole = foundUser.Role;

    const slug = _userRole.dataValues.slug;

    let currentUserRole = slug.split("_")[0];
    currentUserRole = currentUserRole.split(" ")[0].toLowerCase();
    if (currentUserRole !== userRole.toLowerCase()) {
      return res
        .status(403)
        .send(
          ResponseFormatService.responseUnauthorized(
            null,
            { email: "Forbidden access" },
            false
          )
        );
    }

    const expiresIn = "30m";
    const accessToken = jwt.sign(
      {
        username: foundUser.username,
        role: userRole.toLowerCase(),
        userId: foundUser.id,
        partnerId: foundUser.partnerId,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: expiresIn }
    );

    console.log(foundUser.Partners, "-=-=--=-=-=-=-");
    return res.status(200).send(
      ResponseFormatService.responseOk(
        {
          user: {
            id: foundUser.id,
            email: foundUser.email,
            partnerId: foundUser?.partnerId,
            roleId: _userRole.dataValues.id,
            token: accessToken,
            roles: [currentUserRole.toUpperCase()],
            permissions: foundUser.Role.permission,
            partner: foundUser.Partner,
          },
          token: accessToken,
        },
        "User LoggedIn!",
        true
      )
    );
  } catch (e) {
    return res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message || "Something went wrong!",
          false
        )
      );
  }
};

module.exports = {
  oAuthenticate,
  authenticate,
};
