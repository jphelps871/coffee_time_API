const express = require('express');
const app = express();
require('dotenv').config();

const loaders = require('./loaders');

async function startServer() {
  loaders(app);

  const port = process.env.PORT || 3001;

  app.listen(port, () => {
    console.log(`listening at ${port}...`);
  });
}

startServer();
