const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token)
    return res
      .status(401)
      .send({ message: 'ACCESS DENIED: No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch ({ message }) {
    res.status(400).send({ message: 'INVALID TOKEN' });
  }
}
module.exports = { auth };
