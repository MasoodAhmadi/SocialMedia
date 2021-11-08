const tutorials = require("../routes");

module.exports = function (app) {
  app.use("/tutorials", tutorials);
};
