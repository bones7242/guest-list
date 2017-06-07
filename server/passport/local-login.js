// Load dependencies
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../../config');

// return the passport local strategy object.
module.exports = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    // build user data object.
    const userData = {
      email: email.trim(),
      password: password.trim(),
    };
    // find a user by email address
    return User.findOne({ email: userData.email }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        return done(error);
      }
      // check if a hashed user's password is equal to the value saved in the database by calling the comparePassword schema method
      return user.comparePassword(userData.password, (passwordErr, isMatch) => {
        if (err) { return done(err); }
        if (!isMatch) {
          const error = new Error('Incorrect email or password');
          error.name = 'IncorrectCredentialsError';
          return done(error);
        }
        const payload = {
          sub: user._id,
        };
        const token = jwt.sign(payload, config.jwtSecret);
        const data = {
          name: user.name,
          id: user._id,
        };
        return done(null, token, data);
      });
    });
  },
);

