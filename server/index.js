// importing libraries
const express = require('express');
// initializing express
const app = express();
// initializing services
require('./start/middlewares.start')(app);
require('./start/routes.start')(app);
require('./start/sequelize.start')();

const { NODE_ENV, SERVER_CONTAINER_PORT, SERVER_PUBLIC_PORT } = process.env;
const { SERVER_CONTAINER_TEST_PORT, SERVER_PUBLIC_TEST_PORT } = process.env;
const CONTAINER_PORT =
  NODE_ENV === 'test' ? SERVER_CONTAINER_TEST_PORT : SERVER_CONTAINER_PORT;
const PUBLIC_PORT =
  NODE_ENV === 'test' ? SERVER_PUBLIC_TEST_PORT : SERVER_PUBLIC_PORT;

const server = app.listen(CONTAINER_PORT, () => {
  console.log(`Server is running on localhost:${PUBLIC_PORT}`);
});

module.exports = server;
// const express = require("express");
// const fileUpload = require("express-fileupload");
// const userRouter = require("./routes/users.routes");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const cors = require("cors");
// const app = express();

// const PORT = process.env.SERVER_CONTAINER_PORT || 8000;

// app.use(bodyParser.json());
// app.use(express.json());
// app.use(cors());

// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );

// app.use(express.urlencoded({ extended: true }));
// app.use("/api/users", userRouter);

// app.get("/", (req, res) => {
//   res.send("chat application api!");
// });

// app.listen(PORT, () => {
//   console.log(`Listening on port ${PORT}`);
// });
