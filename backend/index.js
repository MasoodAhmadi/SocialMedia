const express = require("express");
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/users.routes");
const localizationRouter = require("./routes/localization.routes");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const app = express();

const PORT = process.env.SERVER_CONTAINER_PORT || 8000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/username", userRouter); //check user name exist or not
app.use("/finduser", userRouter);
app.use("/localization", localizationRouter);
app.get("/", (req, res) => {
  res.send("chat application api!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
