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

router.get("/:id", async (req, res, next) => {
  try {
    const user = await db.User.findOne({ where: { id: req.params.id } });
    res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error);
  }
});

router.post("/adduser", async (req, res, next) => {
  console.log("req.body", req.body);

  const { username, firstname, email, password, bio } = req.body;
  const valueItem = { username, firstname, email, password, bio };
  try {
    const users = await db.User.create(valueItem);
    return res.status(201).send(users);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res, next) => {
  console.log("req.body", req.body);

  try {
    await db.User.update(req.body, {
      where: { id: req.params.id },
    });
    const user = await db.User.findOne({ where: { id: req.params.id } });
    res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error);
  }
});

module.exports = router;
