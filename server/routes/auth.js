const express = require("express");
const validator = require("validator");
const passport = require("passport");

const router = new express.Router();

/*
    Validate the sign up form

    @param {object} payload - the HTTP body message
    @returns {object} The result of validation. Object contains a boolean validation result, errors tips, and a global message for the whole form.
 */

function validateSignupForm(payload) {
    //console.log("validating signup form.  Payload:", payload);
    const errors = {};
    let isFormValid = true;
    let message = "";

    // make sure an email is provided, is an email, and is a string.
    if (!payload || typeof payload.email !== "string" || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = "Please provide a correct email address.";
    }

    // Make sure a passowrd is provided, is a string, and is >= 8 characters 
    if (!payload || typeof payload.password !== "string" || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = "Password must have at least 8 characters.";
    }

    if (!payload || typeof payload.name !== "string" || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = "Please provide your name.";
    }

    if (isFormValid === false) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

/*
    Validate the login form.
    @param {object} payload - the HTTP body message
    @returns {object} The result of validation. Object contains a boolean validation result, errors tips, and a global message for the whole form.
*/

function validateLoginForm(payload) {

    console.log("server - validating login form.  payload:", payload);

    const errors = {};
    let isFormValid = true;
    let message = "";

    // make sure an email is provided and is a string.
    if (!payload || typeof payload.email !== "string" || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = "Please enter an email address.";
    }

    // Make sure a password is provided and is a string 
    if (!payload || typeof payload.password !== "string" || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = "Password must have at least 8 characters.";
    }

    if (!isFormValid) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

// POST ROUTES
// Route for signup.
router.post("/signup", (req, res, next) => {
    //console.log("/auth/signup POST received.");
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    } else {
        return passport.authenticate("local-signup", (err) => {
            console.log("error is type:", typeof(err));
            /* handle errors.
            If a user with the same email address already exists, he should get a concrete error message, but if something unpredictable happens he shouldn’t get a descriptive message containing error codes, as he may use the information for bad purposes.
            */
            if (err) {
                // check for a specific mongo error.
                if (err.name === "MongoError" && err.code === 11000){
                    // the 11000 Mongo code is for a duplication email error.
                    // the 409 HTTP status code is for conflict error.
                    return res.status(409).json({
                        success: false,
                        message: "Check the form for error.",
                        errors: {
                            email: "This email is already taken."
                        }
                    });
                }
                // as a default for other errors, return the below.
                return res.status(400).json({
                    success: false,
                    message: "Could not process the form."
                });
            }
            // success case.
            console.log("login validation (authentication) was a success. error:", err);
            return res.status(200).json({
                success: true,
                message: "You have successfully signed up! Now you should be able to log in."
            });
        })(req, res, next);
    }    
});

// Route for login.
router.post("/login", (req, res, next) => {

    console.log("/auth/login POST received.");

    const validationResult = validateLoginForm(req.body);

    // if validation fails. 
    if (!validationResult.success) {
        console.log("Login form validation failed.");
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    // if validation is successfull.
    } else {
        console.log("Login form validation was a success.");
        return passport.authenticate("local-login", (err, token, userData) => { 
            /* handle errors. 
            We’re checking if there are no errors have appeared (for example, a user has provided a wrong password). 
            In the successful case, we send a response with a token.
            */
            console.log("error is type:", typeof(err));
            if (err) {
                console.log("login validation (authentication) failed. Error:", err);
                // look for this specific error.
                if (err.name === "IncorrectCredentialsError") {
                    return res.status(400).json({
                        success: false,
                        message: err.message
                    });
                };
                // for all other errors send this as default.
                return res.status(400).json({
                    success: false,
                    message: "Could not process the form."
                });
            }
            // if there are no errors, return a success message with a token 
            console.log("login validation (authentication) succeeded.");
            return res.json({
                success: true,
                message: "You have successfully logged in!",
                token,
                user: userData
            });
        })(req, res, next);        
    }    
});

module.exports = router;
