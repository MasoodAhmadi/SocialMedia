const { Sequelize } = require('sequelize');
const userModel = require('./models/user.modal');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_ROOT_USER,
  process.env.DATABASE_ROOT_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_CONTAINER_PORT,
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
