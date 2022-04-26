const express = require("express");
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/users.routes");
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
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("chat application api!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
