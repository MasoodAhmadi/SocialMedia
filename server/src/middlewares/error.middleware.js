function errorHandler(err, req, res, next) {
  const code =
    err.clientStatusCode ?? err.statusCode ?? err.response?.status ?? 500;

  if (err.statusCode === 301) {
    return res.status(301).redirect('/not-found');
  }

  return res.status(code).json({
    message:
      err?.clientMessage?.toString() ??
      err?.message?.toString() ??
      err.toString(),
  });
}

module.exports = errorHandler;
