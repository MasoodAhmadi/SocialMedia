const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { default: isEmail } = require('validator/lib/isEmail');
const { auth } = require('../middleware');
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

//get all user
router.get('/token', auth, async (req, res) => {
  const user = await userModel.findOne(req.user._id);
  if (!user) return res.status(404).json({ message: "User doesn't exist" });
  res.status(200).send({
    id: user._id,
    email: user.email,
    username: user.username,
    profileImage: user.profilePicUrl,
  });
});

//get by username
// router.get('/:username', async (req, res) => {
//   const { username } = req.params;
//   try {
//     if (username.length < 1) return res.status(401).send('Invalid');
//     if (!regexUserName.test(username)) return res.status(401).send('Invalid');
//     const user = await userModel.findOne({ username: username.toLowerCase() });
//     if (user) return res.status(401).send('Username already taken');
//     return res.status(200).send('Available');
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send(`Server error`);
//   }
// });

//login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!isEmail(email)) return res.status(401).send('Invalid Email');
  if (password.length < 6) {
    return res.status(401).send('Password must be atleast 6 characters');
  }
  try {
    const user = await userModel
      .findOne({ email: email.toLowerCase() })
      .select('+password');
    if (!user) {
      return res.status(401).send('invalid credentialssssssssss');
    }
    const isPassword = await bcrypt.hash(password, 10);
    if (!isPassword) {
      return res.status(401).send('invalid credentialddddddd');
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '10h',
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Server error`);
  }
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
