const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
require("dotenv").config();
const app = express();
const roleCheckMiddleware = require("./middleware/roleCheckMiddleware");
const apiAuthMiddleware = require("./middleware/apiAuthMiddleware");
// var corsOptions = {
//   origin: "http://localhost:8081",
// };

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
//const State = db.states;
//const statesData = require("./json/state.json");
const UserService = require("./services/users.service");

db.sequelize
  .sync({ logging: false })
  .then(() => {
    //console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Started the application." });
// });

// app.get("/import-state", async (req, res) => {
//   try {
//     const stateNames = statesData.states.map((state) => {
//       return { name: state.name };
//     });
//     await State.bulkCreate(stateNames);
//     res.status(200).send("States populated successfully.");
//   } catch (error) {
//     console.error("Error populating states:", error);
//     res.status(500).send("Internal server error");
//   }
// });

require("./routes/authentication.routes.js")(app);
app.use("/api/permission/", require("./routes/permissions.routes.js"));
app.use("/api/admin", roleCheckMiddleware(), require("./routes/admin"));
app.use("/api/partner", roleCheckMiddleware(), require("./routes/partner"));



/**
 * This is public route and used for IMI
 * 
 */
app.use("/api/imi/", require("./routes/imi.routes"));

/* Implement API Access for Partners */
//app.use("/api/partner", apiAuthMiddleware, require("./routes/partner"));
app.use(
  "/api/oauth/v1/partner",
  apiAuthMiddleware,
  require("./routes/partner")
);

app.use("/api", async (req, res) => {
  const user = await UserService.findOneUser({
    configKey: "id",
    key: 1,
  });
  res.status(200).send({
    "App status": "running",
    version: 1.4,
    release: "1/11/2023",
    user,
  });
});

//require("./routes/partner.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  //  console.log(`Server is running on port ${PORT}.`);
});
