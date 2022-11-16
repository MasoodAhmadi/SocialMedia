const jwt = require('jsonwebtoken');
// const secret = require('./config');
require('dotenv').config();

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token)
    return res.status(401).send({ error: 'ACCESS DENIED: No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch ({ message }) {
    res.status(400).send({ error: 'INVALID TOKEN', message });
  }
}

module.exports = { verifyToken };

// const jwt = require("jsonwebtoken");
// const config = require("../config/auth.config.js");
// const db = require("../models");
// const User = db.user;
// verifyToken = (req, res, next) => {
//   let token = req.headers["x-access-token"];
//   if (!token) {
//     return res.status(403).send({
//       message: "No token provided!",
//     });
//   }
//   jwt.verify(token, config.secret, (err, decoded) => {
//     if (err) {
//       return res.status(401).send({
//         message: "Unauthorized!",
//       });
//     }
//     req.userId = decoded.id;
//     next();
//   });
// };

// const authJwt = {
//   verifyToken: verifyToken,
// };
// module.exports = authJwt;
