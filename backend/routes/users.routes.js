const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
router.post("/addprofile", async (req, res, next) => {
  console.log(req.body);
  try {
    const { username, firstname, email, password, bio } = req.body;
    if (!isEmail(email)) return res.status(401).send("invalid email");
    if (password.length < 6)
      return res.status(400).send("password must be 8 charactor");
    const allVal = {
      username,
      firstname,
      email,
      profilePicUrl,
      password,
      bio,
    };
    product.password = await bcrypt.hash(password, 10);
    const file = req.files.photo;

    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      product.profilePicUrl = result.url;
      await User.create(allVal);
      return res.status(200).json(allVal);
    });
  } catch (message) {
    error.status(500).send({ message });
  }
});

//image posting jannaten method
router.post("/upload_jannaten", async (req, res, next) => {
  try {
    const { username, firstname, email, password, bio } = req.body;
    if (!isEmail(email)) return res.status(400).send("invalid email");
    if (password.length < 6)
      return res.status(400).send("password must be 8 charactor");
    let product = {
      username,
      firstname,
      email,
      password,
      bio,
    };
    product.password = await bcrypt.hash(password, 10);
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
      product.profilePicUrl = result.url;
      await User.create(product);
      return res.status(200).json(product);
    });
  } catch ({ message }) {
    res.status(500).send({ message });
  }
});

module.exports = router;
