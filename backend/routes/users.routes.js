const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const userPng = require("../utils/image");
const router = require("express").Router();
const follower = require("../models/follower");
const { username } = require("../config/config");
const isEmail = require("validator/lib/isEmail");
const resgexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const { User } = db;

router.get("/:username", async (req, res, next) => {
  const { username } = req.params;
  try {
    if (username.length < 0) return res.status(401).send("invalid");
    if (resgexUserName.test(username)) return res.status(400).send("invalid");
    const user = await User.findOne({ username: username.toLowerCase() });
    if (user) return res.status(401).send("Username already taken");
    return res.status(200).send("Available!");
  } catch (error) {
    console.log(error);
    return res.status(500).send("server error");
  }
});
router.get("/", async (req, res, next) => {
  try {
    if (User.length < 0) return res.status(400).send("invalid");

    const users = await User.findAll({});
    res.status(200).json(users);
  } catch (error) {
    console.log("error happened!", error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error);
  }
});

router.post("/adduser", async (req, res, next) => {
  console.log("req.body", req.body);

  const {
    username,
    firstname,
    email,
    password,
    bio,
    facebook,
    twitter,
    youtube,
    instagram,
    profilePicUrl,
  } = req.body.User;
  // const valueItem = {
  //   username,
  //   firstname,
  //   email,
  //   password,
  //   bio,
  //   profilePicUrl,
  // };

  if (!isEmail(email)) return res.status(400).send("invalid email");
  if (password.length < 6)
    return res.status(400).send("password must be 8 charactor");

  try {
    let users;
    users = await User.find({ email: email.toLowerCase() });
    if (users) {
      return res.status(401).send("email already taken");
    }

    users = new UserModel({
      firstname,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password,
      profilePicUrl: req.body.profilePicUrl | userPng,
    });
    users.password = await bcrypt.hash(password, 10);
    await users.save();

    let profileField = {};

    profileField.users = users._id;
    profileField.bio = bio;
    profileField.social = {};

    if (facebook) profileField.social.facebook = facebook;
    if (youtube) profileField.social.facebook = youtube;
    if (twitter) profileField.social.facebook = twitter;
    if (instagram) profileField.social.facebook = instagram;

    await new ProfileModel(profileField).save();

    await new follower({
      users: users._id,
      followers: [],
      following: [],
    }).save();
    const payload = { userId: user._id };
    jwt.sign(payload, process.env.jwtsecret, { expire: "2d" }, (err, token) => {
      if (err) throw err;
      return res.status(201).json(token);
    });
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
    const user = await User.findOne({ where: { id: req.params.id } });

    res.status(200).json(user);
  } catch (error) {
    console.log("error: ", error);
  }
});

module.exports = router;
