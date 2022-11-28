const { Sequelize } = require('sequelize');
const userModel = require('./models/user');

/*==========================================================================
  Database Tables

	show tables;
	+--------------------------+
	| Tables_in_Videon_Palvelu |
	+--------------------------+
	| users							       |
	| customer                 |
	| video                    |
	| customer_videos          |
	+--------------------------+
==========================================================================*/

/*==========================================================================
  Initialize Sequelize
==========================================================================*/
const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_ROOT_USER,
  process.env.DATABASE_ROOT_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_CONTAINER_PORT,
    dialect: 'mariadb',
    pool: {
      max: 90,
      // min: 0,
      // acquire: 30000,
      // idle: 10000
    },
    define: { underscored: true },
    logging: false,
  }
);

/*==========================================================================
  Authentication / connection test
==========================================================================*/
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', err);
}

try {
  // sequelize.sync({ alter: true });
  sequelize.sync({ force: false /* true resettaa tietokannan */ });
  console.info('Database and tables created!');
} catch (error) {
  console.error('Error while creating the database:', err);
}

/*=================================================================== 
  Models / Tables
===================================================================*/
const User = userModel(sequelize, Sequelize);

/*=================================================================== 
	Relations
===================================================================*/
// Customer - Customer_Videos_Ref
// follower.hasMany(User);
// follower.belongsTo(User, { foreignKey: { allowNull: false } });

module.exports = {
  sequelize,
  User,
};
