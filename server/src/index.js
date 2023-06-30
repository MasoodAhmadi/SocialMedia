// importing libraries
require('dotenv').config();
const express = require('express');
const app = express();
// importing routes
app.use(express.json());
app.use(express.static('build'));
// const { unknownEndpointHandler, error } = require('./middleware');
const connectDb = require('./utilsServer/connectDb');
connectDb();

// routes
app.use('/api/auth/token', require('./routes/auth.routes'));
app.use('/api/auth/login', require('./routes/auth.routes'));
app.use('/api/users', require('./routes/users.routes'));
// app.use(`/api/auth/login`, require('./routes/auth.routes'));

// next handler
// app.use(error);
// app.use(unknownEndpointHandler);

const PORT = process.env.SERVER_PUBLIC_PORT;
const server = app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

module.exports = server;
