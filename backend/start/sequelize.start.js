const db = require("../models");
const winston = require("winston");

module.exports = function (app) {
  const PORT = 3100;

  db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
      winston.info("Database is connected");
      console.log(`listening to port ${PORT}`);
    });
  });
};
