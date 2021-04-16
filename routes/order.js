const express = require('express');
const router = express.Router();

module.exports = (app) => {
  app.use('/order', router);

  router.get('api/', (req, res) => {
    res.send('Orders');
  });
};
