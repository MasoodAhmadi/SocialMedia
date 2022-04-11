const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const userPng = require("../utils/image");
const router = require("express").Router();
const follower = require("../models/follower");
const isEmail = require("validator/lib/isEmail");
const resgexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const { User } = db;
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ahmadimasood",
  api_key: "483589172997211",
  api_secret: "qGfb6WbmcaO1GvNUU5lJEVkp1rI",
});

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
  const {
    username,
    firstname,
    email,
    password,
    bio,
    profilePicUrl,
    facebook,
    twitter,
    youtube,
    instagram,
  } = req.body;
  const allVal = {
    username,
    firstname,
    email,
    profilePicUrl,
    password,
    bio,
    facebook,
    twitter,
    youtube,
    instagram,
  };
  if (!isEmail(email)) return res.status(401).send("invalid email");
  if (allVal.password.length < 6)
    return res.status(400).send("password must be 8 charactor");
  try {
    let userLocate = await User.findOne({ where: { email } });
    if (userLocate)
      return res.status(401).send({ message: "Email already registered" });
    allVal.password = await bcrypt.hash(password, 10);
    await User.create(allVal);
    return res.status(200).json(user);

    // let profileField = {};
    // profileField.users = users._id;
    // profileField.bio = bio;
    // profileField.social = {};
    // if (facebook) profileField.social.facebook = facebook;
    // if (youtube) profileField.social.facebook = youtube;
    // if (twitter) profileField.social.facebook = twitter;
    // if (instagram) profileField.social.facebook = instagram;
    // await new ProfileModel(profileField).save();
    // await new follower({
    //   users: user._id,
    //   followers: [],
    //   following: [],
    // }).save();
    // const payload = { userId: user._id };
    // jwt.sign(payload, process.env.jwtsecret, { expire: "2d" }, (err, token) => {
    //   if (err) throw err;
    //   return res.status(201).json(token);
    // });
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

//image posting
router.post("/upload", (req, res, next) => {
  console.log(req.body);
  // const {
  //   username,
  //   firstname,
  //   email,
  //   password,
  //   bio,
  //   profilePicUrl,
  //   facebook,
  //   twitter,
  //   youtube,
  //   instagram,
  // } = req.body;
  // const allVal = {
  //   username,
  //   firstname,
  //   email,
  //   profilePicUrl,
  //   password,
  //   bio,
  //   facebook,
  //   twitter,
  //   youtube,
  //   instagram,
  // };

  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log(result);

    // if (!isEmail(email)) return res.status(401).send("invalid email");
    // if (allVal.password.length < 6)
    //   return res.status(400).send("password must be 8 charactor");
    product = {
      username: req.body.username,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
      bio: req.body.bio,
      profilePicUrl: result.url,
      // let userLocate = User.findOne({ where: { email: email } });
      // if (userLocate)
      //   return res.status(401).send({ message: "Email already registered" });
      //allVal.password = bcrypt.hash(password, 10);
    };
    // product.save();
    User.create(product);
    return res.status(200).json(product);
  });
});

module.exports = router;
