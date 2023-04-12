// importing libraries
const express = require('express');
const app = express();
// initializing services
require('./start/middleware.start')(app);
require('./start/routes.start')(app);

const PORT = process.env.SERVER_PUBLIC_PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

module.exports = server;
