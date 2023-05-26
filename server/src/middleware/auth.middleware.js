// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     if (!req.headers.authorization) {
//       return res.status(401).send(`no token avai: Unauthorized`);
//     }

//     const { userId } = jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY);

//     req.userId = userId;
//     next();
//   } catch (error) {
//     console.error(error);
//     return res.status(401).send(`Unauthorized`);
//   }
// };

const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  console.log('token', token);
  if (!token)
    return res
      .status(401)
      .send({ message: 'ACCESS DENIED: No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('deconde', decoded);
    req.user = decoded;
    next();
  } catch ({ message }) {
    res.status(400).send({ message: 'INVALID TOKEN' });
  }
}
module.exports = { auth };
