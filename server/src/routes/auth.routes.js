const router = require('express').Router();
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { User } = require('../sequelize');
const User = require('../models/user.modal');
// const isEmail = require('validator/lib/isEmail');
const auth = require('../middleware/auth.middleware');

router.get('/', async (req, res) => {
  const user = await User.findOne(req.user);
  if (!user) return res.status(404).json({ message: "User doesn't exist" });
  res.status(200).send(user);
});

// router.post('/', async (req, res) => {
//   const { email, password } = req.body.user;

//   if (!isEmail(email)) return res.status(401).send('Invalid Email');

//   if (password.length < 6) {
//     return res.status(401).send('Password must be atleast 6 characters');
//   }
//   try {
//     const user = await User.findOne({ email: email.toLowerCase() }).select(
//       '+password'
//     );
//     if (!user) {
//       return res.status(401).send('Invalid Credentials');
//     }
//     const isPassword = await bcrypt.compare(password, user.password);
//     if (!isPassword) {
//       return res.status(401).send('Invalid Credentials');
//     }
//     const payload = { userId: user._id };
//     jwt.sign(
//       payload,
//       process.env.jwtSecret,
//       { expiresIn: '10h' },
//       (err, token) => {
//         if (err) throw err;
//         res.status(200).json(token);
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send(`Server error`);
//   }
// });
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const UserModel = require("../models/UserModel");
// const FollowerModel = require("../models/FollowerModel");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const isEmail = require("validator/lib/isEmail");

// router.post("/", async (req, res) => {
//   const { email, password } = req.body.user;

//   if (!isEmail(email)) return res.status(401).send("Invalid Email");

//   if (password.length < 6) {
//     return res.status(401).send("Password must be atleast 6 characters");
//   }

//   try {
//     const user = await UserModel.findOne({ email: email.toLowerCase() }).select(
//       "+password"
//     );

//     if (!user) {
//       return res.status(401).send("Invalid Credentials");
//     }

//     const isPassword = await bcrypt.compare(password, user.password);
//     if (!isPassword) {
//       return res.status(401).send("Invalid Credentials");
//     }

//     const payload = { userId: user.id };
//     jwt.sign(
//       payload,
//       process.env.jwtSecret,
//       { expiresIn: "2d" },
//       (err, token) => {
//         if (err) throw err;
//         res.status(200).json(token);
//       }
//     );
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send(`Server error`);
//   }
// });

// module.exports = router;
