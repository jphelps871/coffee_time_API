const express = require('express');
const router = express.Router();
const { validationResult, check } = require('express-validator');

const UserService = require('../services/userServices');
const db = new UserService();

module.exports = (app, passport) => {
  app.use('/api/user', router);

  router.get('/', async (req, res) => {
    res.send(req.user);
  });

  router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      res.statusCode = 200;
      res.json({ 
        message: 'Logged out!' ,
        status: 200
      });
    });
  });

  // Validate user credentials
  router.use(
    '/',
    check('password')
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('must contain a number'),

    check('email').isEmail().withMessage('Must be a valid email').trim(),

    (req, res, next) => {
      try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          throw { status: 400, error: errors.array() };
        }
      } catch (err) {
        next(err);
      }

      next();
    },
  );

  router.post('/register', async (req, res, next) => {
    try {
      const userCredentials = req.body;

      const response = await db.register(userCredentials);

      res.json(response);
    } catch (err) {
      next(err);
    }
  });

  router.post(
    '/login',
    passport.authenticate('local'),
    async (req, res, next) => {
      try {
        const userCredentials = req.body;

        await db.login(userCredentials);

        res.json({ message: 'Logged in' });
      } catch (err) {
        next(err);
      }
    },
  );

  // function checkAuthenticated(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     return next();
  //   }

  //   res.send('/login');
  // }

  // function checkNotAuthenticated(req, res, next) {
  //   if (req.isAuthenticated()) {
  //     res.redirect('/');
  //   }

  //   next();
  // }
};
