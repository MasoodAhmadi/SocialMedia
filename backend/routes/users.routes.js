require("dotenv").config();
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const follower = require("../models/follower");
const isEmail = require("validator/lib/isEmail");
const resgexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const { User } = db;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "demo",
//   allowedFormats: ["jpg", "png"],
//   transformation: [{ width: 500, height: 500, crop: "limit" }],
// });

// const parser = multer({ storage: storage });

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
      return res.status(200).send("Available");
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

router.post("/signup", async (req, res, next) => {
  console.log("/signup");
  try {
    const { username, name, email, password, bio } = req.body;
    if (!isEmail(email)) return res.status(401).send("invalid email");
    if (password.length < 6)
      return res.status(400).send("password must be 8 charactor");
    const userfind = await User.findAll({
      where: { email },
    });
    if (userfind[0]) {
      console.log(userfind[0]);
      return res.status(401).send("email already exists");
    }
    let product = {
      username,
      name,
      email,
      password,
      bio,
    };
    product.password = await bcrypt.hash(password, 10);
    if (req.files !== null) {
      const file = req.files.photo;
      cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
        if (!err) {
          const myUser = new User({
            username: product.username,
            name: product.name,
            created_at: new Date(),
            email: product.email,
            password: product.password,
            bio: product.bio,

            //save to DB mysql
            profilePicUrl: result.url,
          });
          console.log(myUser);
          myUser.save(function (err, res) {
            if (err) {
              res.send(err);
            }
            return res.status(200).json(myUser);
          });
        }
      });
    } else {
      await User.create(product);
      return res.status(200).json(product);
    }
  } catch ({ message }) {
    console.log("/signup failed " + message);
    res.status(500).send({ message });
  }
});

module.exports = router;

//image posting
// router.post("/addprofile", async (req, res, next) => {
//   console.log("/addprofile");
//   try {
//     const { username, name, email, password, bio } = req.body;
//     if (!isEmail(email)) return res.status(401).send("invalid email");
//     if (password.length < 6)
//       return res.status(400).send("password must be 8 charactor");
//     const userfind = await User.findAll({
//       where: { email },
//     });
//     if (userfind[0]) {
//       console.log("i am here");
//       console.log(userfind[0]);
//       return res.status(401).send("user exists");
//     }
//     let product = {
//       username,
//       name,
//       email,
//       password,
//       bio,
//     };
//     product.password = await bcrypt.hash(password, 10);
//     if (req.files !== null) {
//       const file = req.files.photo;
//       cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
//         product.profilePicUrl = result.url;
//         console.log(result);
//         await User.create(product);
//         return res.status(200).json(product);
//       });
//     } else {
//       await User.create(product);
//       return res.status(200).json(product);
//     }
//   } catch ({ message }) {
//     console.log("/addprofile failed " + message);
//     res.status(500).send({ message });
//   }
// });

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
