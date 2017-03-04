const User = require("mongoose").model("User");
const PassportLocalStrategy = require("passport-local").Strategy;

// return the Passport Local Strategy object.
module.exports = new PassportLocalStrategy(
    // the first argument is the options for the Strategy.
    {
        usernameField: "email",  // sets the custom name of parameters in the POST body message
        passwordField: "password",  // sets the custom name of parameters in the POST body message
        session: false, // set to false because we will use token approach to auth 
        passReqToCallback: true  // we want to be able to read the post body message parameters in the callback 
    }, 
    // the second argument is the callback 
    (req, email, password, done) => {
        // define an object that contains all the user data  
        const userData = {
            email: email.trim(),
            password: password.trim(),
            name: req.body.name.trim()
        };
        // create a new user record, via the User schema, from the user data 
        const newUser = new User(userData);
        // save the new user record 
        newUser.save((err) => {
            // handle errors with the save.
            if (err) { return done (err); }
            // return if no errors.
            return done(null);
        });
    }
);