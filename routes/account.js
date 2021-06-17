const express = require('express');
const router = express.Router();

const AccountService = require('../services/accountServices');
const AccountServiceInstance = new AccountService();

module.exports = (app) => {
  app.use('/api/account', checkAuthentication, router);

  router.get('/', async (req, res, next) => {
    try {
      const { id } = req.user;
      await AccountServiceInstance.getUserById(id);

      res.send({ user: id });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { column, value } = req.body;

      const response = await AccountServiceInstance.update(column, value, id);

      res.send(`Your ${column} is now ${value}`);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await AccountServiceInstance.delete(id);

      res.send('Account deleted');
    } catch (err) {
      next(err);
    }
  });

  function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.send('Please login');
    }
  }
};
