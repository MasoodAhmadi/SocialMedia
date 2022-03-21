require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/users.routes");
const app = express();
app.use(express.json());
const PORT = process.env.SERVER_CONTAINER_PORT;
// const PORT = 8003;

app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("Hello Worldssssss!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
