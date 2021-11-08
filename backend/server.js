const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
/* const tutorials = require("./controllers/tutorial.contoller");

const { sequelize } = require("./models"); */

require("./start/routes.start")(app);
require("./start/sequelize.start")(app);
