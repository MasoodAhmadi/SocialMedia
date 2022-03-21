const router = require("express").Router();
const db = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const users = await db.User.findAll({});
    res.status(200).json(users);
  } catch (error) {
    console.log("error happened!", error);
  }
});

module.exports = router;
