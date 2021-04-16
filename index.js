const express = require('express');
const app = express();
require('dotenv').config();

const loaders = require('./loaders');

async function startServer() {
  loaders(app);

  app.listen(process.env.PORT || 3001, () => {
    console.log(`listening at ${process.env.PORT || 3001}...`);
  });
}

startServer();
