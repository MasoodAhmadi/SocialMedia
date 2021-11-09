const tutorials = require("../routes");
const users = require("../routes");

module.exports = function (app) {
  app.use("/tutorials", tutorials);
  app.use("/users", users);
};
