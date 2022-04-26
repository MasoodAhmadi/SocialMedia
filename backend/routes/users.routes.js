require("dotenv").config();
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const follower = require("../models/follower");
const isEmail = require("validator/lib/isEmail");
const resgexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

const { User } = db;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

router.get("/username/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    if (username.length < 0) return res.status(401).send("invalid");
    if (!resgexUserName.test(username)) return res.status(400).send("invalid");
    const user = await User.findOne({
      where: { username: username.toLowerCase() },
    });
    if (user) {
      return res.status(401).send("Username already taken");
    } else {
      return res.status(200).send("Available!");
    }
  } catch ({ message }) {
    res.status(500).send({ message });
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

router.get("/finduser/:id", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    res.status(200).json(user);
  } catch ({ message }) {
    err.status(500).send(message);
  }
});

router.put("/updateuser/:id", async (req, res, next) => {
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
  console.log("/addprofile");
  try {
    const { username, firstname, email, password, bio } = req.body;
    if (!isEmail(email)) return res.status(401).send("invalid email");
    if (password.length < 6)
      return res.status(400).send("password must be 8 charactor");
    const userfind = await User.findAll({
      where: { username: username },
    });
    if (userfind[0]) {
      return res.status(401).send("user exists");
    }
    let product = {
      username,
      firstname,
      email,
      password,
      bio,
    };
    product.password = await bcrypt.hash(password, 10);
    if (req.files !== null) {
      const file = req.files.photo;
      cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        product.profilePicUrl = result.url;
        //const payload = { userid: User.id };
        // jwt.sign(
        //   payload,
        //   process.env.JWT_SECRET,
        //   { expires: "2d" },
        //   (err, token) => {
        //     if (err) throw err;
        //     res.status(200).json(token);
        //   }
        // );
        await User.create(product);
        return res.status(200).json(product);
      });
    } else {
      const payload = { userid: User.id };
      // jwt.sign(
      //   payload,
      //   process.env.JWT_SECRET,
      //   { expires: "2d" },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.status(200).json(token);
      //   }
      // );
      await User.create(product);
      return res.status(200).json(product);
    }
  } catch ({ message }) {
    console.log("/addprofile failed " + message);
    res.status(500).send({ message });
  }
});

//image posting jannaten method
/* router.post("/upload_jannaten", async (req, res, next) => {
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
}); */

module.exports = router;
