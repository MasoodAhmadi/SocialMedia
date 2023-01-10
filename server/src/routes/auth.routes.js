const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { user } = require('../sequelize');

const auth_schema = Joi.object({
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(3).max(512).required(),
});
router.post('/signin', async (req, res) => {
  const { email } = req.body;
  const { value, error } = auth_schema.validate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });
  const userFound = await user.findAll({
    where: { email },
  });
  if (!userFound[0])
    return res.status(400).send({ error: 'Invalid email or password' });
  const validPassword = await bcrypt.compare(
    value.password,
    userFound[0].password
  );
  if (!validPassword)
    return res.status(400).send({ error: 'Invalid email or password' });
  const token = user.generateAuthToken(userFound[0].id);
  res.status(200).send({ token });
});

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
