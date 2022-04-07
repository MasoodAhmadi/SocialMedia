module.exports = {
  database: process.env.DATABASE_NAME,
  username: "root",
  password: process.env.DATABASE_ROOT_PASSWORD,
  dialect: "mariadb",
  host: "database",
  port: "3306",
};
