require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/users.routes");
const app = express();
app.use(express.json());
const cors = require("cors");
const bodyParser = require("body-parser");

//const PORT = process.env.SERVER_CONTAINER_PORT;
const PORT = 8000;

const fileUpload = require("express-fileupload");

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRouter);
// app.use("/api/users/:id", userRouter);
//app.use("/api/updateuser/:id", userRouter);
// app.use("/api/adduser", userRouter);

app.get("/", (req, res) => {
  res.send("welcome!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
