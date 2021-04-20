const expressLoader = require('./express');
const passportLoader = require('./passport');
const routeLoader = require('../routes');
require('dotenv').config;

module.exports = async (app) => {
  const expressApp = await expressLoader(app);

  const passport = await passportLoader(expressApp);

  await routeLoader(app, passport);

  app.use((err, req, res, next) => {
    const { message, status } = err;
    console.log(message + '\n');
    return res.status(status).send({ message });
  });
};
