const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

require("./start/routes.start")(app);
require("./start/sequelize.start")(app);
