const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  return app;
};
