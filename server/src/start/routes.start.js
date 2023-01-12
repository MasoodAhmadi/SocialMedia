// importing middlewares
// const { error, unknownEndpointHandler } = require('../middlewares');

// importing routes
const authRoute = require('../routes/auth.routes');
const userRoute = require('../routes/users.routes');


// importing utils
// const { errorLogger } = require('../utils/logger');

module.exports = function (app) {
  const BASE = '/api';
  // routes
  app.use(`${BASE}/auth`, authRoute);
  app.use(`${BASE}/users`, userRoute);
 
  // next handler
  // app.use(error);
  // app.use(errorLogger);
	// app.use(unknownEndpointHandler);
};
