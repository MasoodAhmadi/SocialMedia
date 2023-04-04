const { Sequelize } = require('sequelize');
require('dotenv').config();

// const config = require('/../config/config.json')[env];
const config = require('./config/config');

const userModel = require('./models/user.modal');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    pool: {
      max: 90,
    },
    define: { underscored: true },
    logging: false,
  }
);

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const User = userModel(sequelize, Sequelize);

module.exports = {
  sequelize,
  User,
};
