const jwt = require('jsonwebtoken');

const generateJWTToken = (uuid, data) => {
  try {
    const token = jwt.sign({ data: { ...data, uuid } }, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    return error;
  }
};

const decodeJWTToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    return decodedToken;
  } catch (error) {
    return error;
  }
};

const verifyJWTToken = (token) => {
  let returnValue = {};
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      returnValue.error = err;
    } else {
      returnValue.decoded = decoded;
    }
  });
  return returnValue;
};

module.exports = { generateJWTToken, decodeJWTToken, verifyJWTToken };
