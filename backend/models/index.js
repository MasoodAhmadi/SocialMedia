const database = require("../config/database.config");
const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
const db = {};

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
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.items = require("./items.model.js")(sequelize, Sequelize);
db.options = require("./options.model.js")(sequelize, Sequelize);

module.exports = db;
