const { unknownEndpointHandler } = require('./unknown-endpoint.middlware');
const asyncErrorHandler = require('./async.middleware');
const { auth } = require('./auth.middleware');
const error = require('./error.middleware');

module.exports = { auth, error, asyncErrorHandler, unknownEndpointHandler };
