// Load dependencies
const jwt = require("jsonwebtoken");
const User = require("mongoose").model("User");
const PassportLocalStrategy = require("passport-local").Strategy;
const config = require("../../config");

// return the passport local strategy object.
module.exports = new PassportLocalStrategy(
    // options.
    {
        usernameField: "email",
        passwordField: "password",
        session: false,
        passReqToCallback: true
    }, 
    // callback.
    (req, email, password, done) => {
        
        console.log("Initiating the passport local-login strategy.")

        // build user data object.
        const userData = {
            email: email.trim(),
            password: password.trim()
        };
        // find a user by email address
        return User.findOne({ email: userData.email }, (err, user) => {
            // if error 
            if (err) {return done(err); }
            // if user does not exist 
            if (!user) {
                const error = new Error("Incorrect email or password");
                error.name = "IncorrectCredentialsError";

                return done(error)
            }
            // check if a hashed user's password is equal to the value saved in the database by calling the comparePassword schema method 
            return user.comparePassword(userData.password, (passwordErr, isMatch) => {
                // if error
                if (err) { return done(err); }
                // if there is not match for the password 
                if (!isMatch) {
                    const error = new Error("Incorrect email or password");
                    error.name = "IncorrectCredentialsError";
                    // return
                    return done(error);
                };
                /* 
                create a JSON web token (JWT) string which will consist of three encoded parts divided by dots:
                    1) header (algorithm and token type)
                    2) payload (data)
                    3) signature
                The signature contains an encoded header, a payload, and a secret key phrase.
                We are not providing an algorythm, so it will use the default HS256
                */
                const payload = {
                    sub: user._id // It’s a reserved key for a subject item, which in our example will be a user’s id.
                };
                const token = jwt.sign(payload, config.jwtSecret);
                const data = {
                    name: user.name
                };
                // return 
                console.log("User and password are a match.")
                return done(null, token, data);
            });
        });
    }
);

