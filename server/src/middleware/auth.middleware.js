const jwt = require('jsonwebtoken');
require('dotenv').config();

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token)
    return res
      .status(401)
      .send({ message: 'ACCESS DENIED: No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('i am decode', decoded);
    req.user = decoded;
    next();
  } catch ({ message }) {
    res.status(400).send({ message: 'INVALID TOKEN' });
  }
}
// if (!req.user) return res.status(403).send({ message: 'Access denied.' });
module.exports = { auth };

/*  -------------------------------------------------------------- */
// const jwt = require('jsonwebtoken');
// // const secret = require('./config');

// function verifyToken(req, res, next) {
//   try {
//     if (!req.headers.authorization) {
//       return res
//         .status(401)
//         .send({ error: 'ACCESS DENIED: No token provided' });
//     }
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
//     req.user = decoded;
//     next();
//   } catch ({ message }) {
//     res.status(400).send({ error: 'INVALID TOKEN', message });
//   }
// }

// module.exports = { verifyToken };

/*  -------------------------------------------------------------- */
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
