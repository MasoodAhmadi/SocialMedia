module.exports = {
  database: "nextjs",
  username: "root",
  password: process.env.DATABASE_ROOT_PASSWORD,
  dialect: "mariadb",
  host: "database",
  port: "3306",
};
