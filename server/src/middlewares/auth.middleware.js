const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token');
  try {
    if (!token)
      return res
        .status(401)
        .send({ message: 'ACCESS DENIED: No token provided' });
    const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = userId;
    next();
  } catch ({ message }) {
    res.status(400).send({ message: 'INVALID TOKEN' });
  }
}
module.exports = { auth };
