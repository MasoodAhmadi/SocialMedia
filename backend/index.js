require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/users.routes");
const app = express();
app.use(express.json());
//const PORT = process.env.SERVER_CONTAINER_PORT;
const PORT = 8000;

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
