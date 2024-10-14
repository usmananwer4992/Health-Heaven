require("dotenv").config();
const { readFileSync } = require("fs");

module.exports = {
  local: {
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    dialect: process.env.DIALECT,
    port: process.env.DPORT,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  development: {
    host: process.env.HOST,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    dialect: process.env.DIALECT,
    port: process.env.DPORT,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  staging: {
    host: "127.0.0.1",
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    dialect: process.env.DIALECT,
    port: process.env.DPORT,
    logging: false,
    dialectOptions: {
      ssl: {
        ca: readFileSync("./rds-ca.pem").toString(),
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
