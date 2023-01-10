// import libraries
const express = require('express');
//const helmet = require('helmet');
// importing utils
//const { requestLogger } = require('../utils/logger');

module.exports = function (app) {
  //app.use(helmet());
  // app.use(requestLogger);
  app.use(express.json());
  app.use(express.static('build'));
};