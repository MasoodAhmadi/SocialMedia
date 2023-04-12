const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../sequelize');
const { user_schema: schema } = require('../validation');
const { auth, asyncErrorHandler } = require('../middleware');

router.get(
  '/token',
  auth,
  asyncErrorHandler(async (req, res) => {
    const user = await User.findOne({
      where: { id: req.user.id },
      paranoid: false,
    });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    res.status(200).send({ id: user.id, email: user.email });
  })
);

router.post(
  '/login',
  asyncErrorHandler(async (req, res) => {
    const { value, error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({
      where: { email: value.email },
      paranoid: false,
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isPasswordCorrect = await bcrypt.compare(
      value.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '10h',
      }
    );
    res.status(200).json({ token });
  })
);
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
