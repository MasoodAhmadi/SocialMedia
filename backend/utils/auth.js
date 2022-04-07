const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const router = require("express").Router();
const follower = require("../models/follower");
const isEmail = require("validator/lib/isEmail");
const { User } = db;

router.post("/adduser", async (req, res, next) => {
  console.log("req.body", req.body);

  const { username, firstname, email, password } = req.body.User;

  if (!isEmail(email)) return res.status(400).send("invalid email");
  if (password.length < 6)
    return res.status(400).send("password must be 8 charactor");

  try {
    const users = await User.find({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!users) {
      return res.status(401).send("invalid credentials");
    }
    const isPassword = await bcrypt.compare(password, users.password);
    if (!isPassword) {
      return res.status(401).send("invalid credentials");
    }

    const payload = { userId: user._id };
    jwt.sign(payload, process.env.jwtsecret, { expire: "2d" }, (err, token) => {
      if (err) throw err;
      return res.status(201).json(token);
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
