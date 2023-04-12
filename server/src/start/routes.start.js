// importing middlewares

// importing routes
const { unknownEndpointHandler, error } = require('../middleware');
const userRoute = require('../routes/users.routes');
const authRoute = require('../routes/auth.routes');

// importing utils
// const { errorLogger } = require('../utils/logger');

module.exports = function (app) {
  const BASE = '/api';
  // routes
  app.use(`${BASE}/auth`, authRoute);
  app.use(`${BASE}/users`, userRoute);

  // next handler
  app.use(error);
  // app.use(errorLogger);
  app.use(unknownEndpointHandler);
};
