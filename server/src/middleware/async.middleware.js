module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error.message);
      next({
        clientStatusCode: 500,
        trace: error?.errors || error?.response?.data,
        statusCode: error.status || error?.response?.status || error.statusCode,
        message: error?.response?.message || error.message,
      });
    }
  };
};
