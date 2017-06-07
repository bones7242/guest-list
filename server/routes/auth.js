const express = require('express');
const validator = require('validator');
const passport = require('passport');
const router = new express.Router();

function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  // Make sure an email is provided, is an email, and is a string.
  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide a correct email address.';
  }

  // Make sure a passowrd is provided, is a string, and is >= 8 characters
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  // Make sure a name is provided.
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }

  if (isFormValid === false) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

function validateLoginForm(payload) {
  console.log('server - validating login form.  payload:', payload);

  const errors = {};
  let isFormValid = true;
  let message = '';

  // make sure an email is provided and is a string.
  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0) {
    isFormValid = false;
    errors.email = 'Please enter an email address.';
  }

    // Make sure a password is provided and is a string
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors,
  };
}

// POST ROUTES
// Route for signup.
router.post('/signup', (req, res, next) => {
  console.log('/auth/signup POST received.');
  // Call the validation method on the body of the request to make sure fields were filled out correctly.
  const validationResult = validateSignupForm(req.body);
  // Handle the response based on the outcome of the validation method.
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }
  return passport.authenticate('local-signup', (err) => {
    if (err) {
      // check for a specific mongo error.
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({
          success: false,
          message: 'Check the form for error.',
          errors: { email: 'This email is already taken.' },
        });
      }
      // as a default for other errors, return the below.
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }
    // success case.
    console.log('login validation (authentication) was a success. error:', err);
    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.',
    });
  })(req, res, next);
});

// Route for login.
router.post('/login', (req, res, next) => {
  console.log('/auth/login POST received.');
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    console.log('Login form validation failed.');
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors,
    });
  }
  console.log('Login form validation was a success.');
  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      console.log('login validation (authentication) failed. Error:', err);
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }
      return res.status(400).json({
        success: false,
        message: 'Could not process the form.',
      });
    }
    // if there are no errors, return a success message with a token
    console.log('login validation (authentication) succeeded.');
    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData,
    });
  })(req, res, next);
});

module.exports = router;
