const User = require("mongoose").model("User");
const Venue = require("mongoose").model("Venue");
// const Venue = require("mongoose").model("Venue"); 

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
        console.log("body 1 ->", req.body);
        // define an object that contains all the user data  
        const userData = {
            email: email.trim(),
            password: password.trim(),
            name: req.body.name.trim(),
            role: req.body.role.trim()
        };

        // create a new user record, via the User schema, from the user data 
        const newUser = new User(userData);
        // save the new user record 
        newUser.save((err, doc) => {
            
            // handle errors with the save.
            if (err) { return done (err); }
            
            // if no errors.
            //return done(null);
            if (userData.role === "owner"){
                // create a venue object, and attach the owner's id to it.
                const venueData = {
                    name: req.body.venueName.trim(),
                    addressOne: req.body.venueAddressOne.trim(),
                    addressTwo: req.body.venueAddressTwo.trim(),
                    zip: req.body.venueZip.trim(),
                    owner: doc._id
                };
                // create a venue record
                const newVenue = new Venue(venueData);
                // save the new venue record
                newVenue.save((err) => {
                    // handle errors with the save.
                    if (err) { return done (err); }
                    // return if no errors.
                    return done(null);
                })
            }

        });
    }
);