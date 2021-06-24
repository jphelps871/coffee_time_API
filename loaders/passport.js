const passport = require('passport');
const LocalStrategy = require('passport-local');
const UserService = require('../services/userServices');
const userServiceInstance = new UserService();

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await userServiceInstance.login({
            email: email,
            password: password,
          });
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  return passport;
};
