const { Op, Sequelize } = require("sequelize");
const db = require("../models");
const ResponseFormatService = require("../services/responseFormat.service");
const Partners = db.partners;
const apiAuthMiddleware = async (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res
      .status(401)
      .json(
        ResponseFormatService.responseUnauthorized(
          null,
          "API key is required",
          false
        )
      );
  }

  try {
    // Fetch the partner from the database using the provided API key
    const partner = await Partners.findOne({
      where: {
        [Sequelize.Op.or]: [{ liveKey: apiKey }, { sandBoxKey: apiKey }],
      },
    });

    if (!partner) {
      return res
        .status(403)
        .json(
          ResponseFormatService.responseUnauthorized(
            null,
            "Unauthorized API key",
            false
          )
        );
    }

    // Determine the API mode based on the key used
    req.apiMode = partner.liveKey === apiKey ? "production" : "sandbox";
    req.body = { ...req.body, apiKey: partner.liveKey };
    req.body = { ...req.body, partnerId: `${partner.id }`};
    req.params = { ...req.params, partnerId: `${partner.id }` };
    next();
  } catch (error) {
    return res
      .status(500)
      .json(
        ResponseFormatService.responseUnauthorized(
          null,
          "Internal server error",
          false
        )
      );
  }
};

module.exports = apiAuthMiddleware;
