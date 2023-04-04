const unknownEndpointHandler = (req, res) => {
  require('dotenv').config();

  if (process.env.NODE_ENV === 'development' || req.path.startsWith('/api')) {
    return res.status(404).send(`Unknown endpoint: ${req.path}`);
  }

  //res.redirect('/?redirect=' + req.path);
  res.sendFile('/app/build/index.html');
};

module.exports = {
  unknownEndpointHandler,
};
