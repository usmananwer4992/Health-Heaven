const db = require("../models");
const ResponseFormatService = require("../services/responseFormat.service");
const Shippings = db.shippings;
all = async (req, res) => {
  try {
    const states = await Shippings.findAll();
    res.send(ResponseFormatService.responseOk(states, "All states", true));
  } catch (e) {
    res
      .status(500)
      .send(
        ResponseFormatService.responseInternalServer(
          null,
          e.message | "Something went wrong!",
          false
        )
      );
  }
};

module.exports = {
  all,
};
