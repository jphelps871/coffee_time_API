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
      res.send('Successful login');
    } catch (err) {
      next(err);
    }
  });

  router.put('/', async (req, res, next) => {
    try {
      const { id } = req.user;
      const { column, value } = req.body;

      const response = await AccountServiceInstance.update(column, value, id);

      res.send(`Your ${column} is now ${value}`);
    } catch (err) {
      next(err);
    }
  });

  router.delete('/', async (req, res, next) => {
    try {
      const { id } = req.user;

      const response = await AccountServiceInstance.delete(id);

      res.send('Account deleted');
    } catch (err) {
      next(err);
    }
  });

  function checkAuthentication(req, res, next) {
    try {
      if (req.isAuthenticated()) {
        next();
      } else {
        throw {
          status: 401,
          error: [{ param: 'account', msg: 'Sorry, you are unauthorized' }],
        };
      }
    } catch (err) {
      next(err);
    }
  }
};
