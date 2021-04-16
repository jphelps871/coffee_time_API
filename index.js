const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

const loaders = require('./loaders');

require('./db.js').connect();

async function startServer() {
  loaders(app);

  app.listen(process.env.PORT || 3001, () => {
    console.log(`listening at ${process.env.PORT || 3001}...`);
  });
}

startServer();
