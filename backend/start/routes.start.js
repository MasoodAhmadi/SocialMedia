const tutorials = require("../routes/tutorial.routes");

module.exports = function (app) {
  app.use("/tutorials", tutorials);
};
