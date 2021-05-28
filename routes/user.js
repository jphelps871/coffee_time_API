const express = require('express');
const router = express.Router();
const { body, validationResult, check } = require('express-validator');

const UserService = require('../services/userServices');
const db = new UserService();

module.exports = (app, passport) => {
  app.use('/api/user', router);

  router.get('/', async (req, res) => {
    res.send(req.user);
  });

  // Validate user credentials
  router.use(
    '/register',
    check('password')
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('must contain a number'),

    check('email').isEmail().withMessage('Must be a valid email').trim(),

    body('firstName').not().isEmpty().withMessage('Connot be empty').trim(),

    body('lastName').not().isEmpty().withMessage('Connot be empty').trim(),

    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      next();
    },
  );

  router.post('/register', async (req, res, next) => {
    try {
      const userCredentials = req.body;

      const response = await db.register(userCredentials);

      res.send(response);
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
        res.send('Logged in');
      } catch (err) {
        next(err);
      }
    },
  );

  router.get('/logout', (req, res) => {
    req.logout();
    res.send('Logged Out');
  });

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
