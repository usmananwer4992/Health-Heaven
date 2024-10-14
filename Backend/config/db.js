const { readFileSync } = require("fs");
const { Sequelize } = require("sequelize");
const config = require("./config");

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "postgres",
    logging: true,
    port: dbConfig.port,
    dialectOptions: {
      ssl: {
        ca: readFileSync("./rds-ca.pem").toString(),
      },
    },
  }
);
module.exports = sequelize;
