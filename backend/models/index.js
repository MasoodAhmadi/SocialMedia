const database = require("../config/database.config");
const Sequelize = require("sequelize");

let sequelize;

sequelize = new Sequelize(database.DB, database.USER, database.PASSWORD, {
  host: database.HOST,
  dialect: database.dialect,
  operatorAliases: false,
  pool: {
    max: database.pool.max,
    min: database.pool.min,
    acquire: database.pool.acquire,
    idle: database.pool.idle,
  },
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.items = require("./items.model.js")(sequelize, Sequelize);
db.options = require("./options.model.js")(sequelize, Sequelize);

module.exports = db;
