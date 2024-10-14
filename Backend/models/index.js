"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};
let sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: true,
    port: config.port,
    // ssl: false,
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync("./rds-ca.pem").toString(),
    //     rejectUnauthorized: false,
    //   },
    // },
  }
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.users = require("./users.js")(sequelize, Sequelize);
db.roles = require("./roles.js")(sequelize, Sequelize);
db.userRoles = require("./userRoles")(sequelize, Sequelize);
db.refresh_token = require("./refresh_token.js")(sequelize, Sequelize);

db.ageGroups = require("./ageGroups")(sequelize, Sequelize);
db.customer = require("./customer")(sequelize, Sequelize);
db.drugCategories = require("./drugCategories")(sequelize, Sequelize);
db.drugClasses = require("./drugClasses")(sequelize, Sequelize);
db.drugForms = require("./drugForms")(sequelize, Sequelize);
db.drugs = require("./drugs")(sequelize, Sequelize);
db.drugTypes = require("./drugTypes")(sequelize, Sequelize);
db.orderDrugs = require("./orderDrugs")(sequelize, Sequelize);
db.orders = require("./orders")(sequelize, Sequelize);
db.orderStatus = require("./orderStatus")(sequelize, Sequelize);
db.partners = require("./partners")(sequelize, Sequelize);
db.permissionRoles = require("./permissionRoles")(sequelize, Sequelize);
db.permissions = require("./permissions")(sequelize, Sequelize);
db.pharmacies = require("./pharmacies")(sequelize, Sequelize);
db.refresh_token = require("./refresh_token")(sequelize, Sequelize);
db.shippings = require("./shippings")(sequelize, Sequelize);
db.sigs = require("./sigs")(sequelize, Sequelize);
db.transferDays = require("./transferDays.js")(sequelize, Sequelize);
db.states = require("./states")(sequelize, Sequelize);
db.transferDrugs = require("./transferDrugs")(sequelize, Sequelize);
db.transfers = require("./transfers")(sequelize, Sequelize);
db.transferStatus = require("./transferStatus")(sequelize, Sequelize);
db.invoice = require("./invoice.js")(sequelize, Sequelize);

// defining associations
db.transfers.belongsTo(db.partners, {
  foreignKey: "partnerId",
});

db.transfers.belongsTo(db.customer, {
  foreignKey: "customerId",
});

db.transfers.belongsTo(db.pharmacies, {
  foreignKey: "pharmacyId",
});

db.transfers.belongsTo(db.drugs, {
  foreignKey: "transferDrugId",
});

db.transfers.belongsTo(db.transferStatus, {
  foreignKey: "transferStatusId",
});

db.transfers.belongsTo(db.sigs, {
  foreignKey: "sigId",
});

db.transfers.belongsTo(db.transferDays, {
  foreignKey: "transferDayId",
});
//drugs associations with drugForms
db.drugs.hasMany(db.orderDrugs, {
  foreignKey: "drugId",
  targetKey: "id",
});
db.orderDrugs.belongsTo(db.drugs, {
  foreignKey: "drugId",
  targetKey: "id",
});
// db.drugs.hasMany(db.drugForms, {
//   foreignKey: "drugFormId",
// });
db.drugs.belongsTo(db.drugForms, {
  foreignKey: "drugFormId",
});
//drugs associations with drugCategories
// db.drugs.hasMany(db.drugCategories, {
//   foreignKey: "drugCategoryId",
// });
db.drugs.belongsTo(db.drugCategories, {
  foreignKey: "drugCategoryId",
});
//drugs associations with drugClass
// db.drugs.hasMany(db.drugClasses, {
//   foreignKey: "drugClassId",
// });
db.drugs.belongsTo(db.drugClasses, {
  foreignKey: "drugClassId",
});
//drugs associations with drugType
// db.drugTypes.hasMany(db.drugs);
db.drugs.belongsTo(db.drugTypes, {
  foreignKey: "drugTypeId",
});
//drugs associations with ageGroups
// db.drugs.hasMany(db.ageGroups, {
//   foreignKey: "ageGroupId",
// });
db.drugs.belongsTo(db.ageGroups, {
  foreignKey: "ageGroupId",
});

// roles and permissions many to many relation
db.roles.belongsToMany(db.permissions, {
  through: db.permissionRoles,
  as: "permission",
  foreignKey: "roleId",
});
db.permissions.belongsToMany(db.roles, {
  through: db.permissionRoles,
  as: "role",
  foreignKey: "permissionId",
});

// db.users.belongsToMany(db.roles, {
//   through: db.userRoles,
//   as: "Role",
//   foreignKey: "userId",
// });

// db.roles.belongsToMany(db.users, {
//   through: db.userRoles,
//   as: "user",
//   foreignKey: "roleId",
// });
// roles and users many to one
db.users.belongsTo(db.roles, {
  as: "Role",
  foreignKey: "roleId",
});
db.roles.hasMany(db.users, {
  foreignKey: "roleId",
});

db.refresh_token.belongsTo(db.users, {
  foreignKey: "userId",
  targetKey: "id",
});
db.users.hasOne(db.refresh_token, {
  foreignKey: "userId",
  targetKey: "id",
});

db.users.belongsTo(db.partners, {
  foreignKey: "partnerId",
  targetKey: "id",
});

db.shippings.belongsTo(db.partners, {
  foreignKey: "partnerId",
  targetKey: "id",
});

db.partners.hasMany(db.users, {
  foreignKey: "partnerId",
  targetKey: "id",
  onDelete: "CASCADE",
});

db.partners.hasMany(db.shippings, {
  foreignKey: "partnerId",
  targetKey: "id",
  onDelete: "CASCADE",
});

db.partners.belongsTo(db.states, {
  foreignKey: "stateId",
  targetKey: "id",
});

// order associations
db.customer.hasMany(db.orders, {
  foreignKey: "customerId",
  targetKey: "id",
});
db.orders.belongsTo(db.customer, {
  foreignKey: "customerId",
  targetKey: "id",
});
db.customer.belongsTo(db.partners, {
  foreignKey: "partnerId",
  targetKey: "id",
});
db.shippings.hasMany(db.orders, {
  foreignKey: "shippingId",
  targetKey: "id",
});
db.orders.belongsTo(db.shippings, {
  foreignKey: "shippingId",
  targetKey: "id",
});
db.states.hasMany(db.orders, {
  foreignKey: "shippingStateId",
  targetKey: "id",
});
db.orders.belongsTo(db.states, {
  foreignKey: "shippingStateId",
  targetKey: "id",
});
db.sigs.hasMany(db.orders, {
  foreignKey: "sigId",
  targetKey: "id",
});
db.orders.belongsTo(db.sigs, {
  foreignKey: "sigId",
  targetKey: "id",
});
db.orderStatus.hasMany(db.orders, {
  foreignKey: "statusId",
  targetKey: "id",
});
db.orders.belongsTo(db.orderStatus, {
  foreignKey: "statusId",
  targetKey: "id",
});
db.orderDrugs.hasMany(db.orders, {
  foreignKey: "orderDrugId",
  targetKey: "id",
});
db.orders.belongsTo(db.orderDrugs, {
  foreignKey: "orderDrugId",
  targetKey: "id",
});
db.partners.hasMany(db.orders, {
  foreignKey: "partnerId",
  targetKey: "id",
});
db.orders.belongsTo(db.partners, {
  foreignKey: "partnerId",
  targetKey: "id",
});
// db.customer.hasOne(db.partners, {
//   foreignKey: "partnerId",
//   targetKey: "id",
// });

db.partners.belongsTo(db.customer, {
  foreignKey: "partnerId",
  targetKey: "id",
});
db.ROLES = ["user", "admin", "moderator"];

db.sequelize = sequelize;
module.exports = db;
