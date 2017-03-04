const jwt = require("jsonwebtoken");
const User = require("mongoose").model("User");
const config = require("../../config");

// the function that will be the auth checker middleware.
module.exports = (req, res, next) => {
    console.log("initiating auth-check middleware");
    // check to see if the authorization header exists.
    if (!req.headers.authorization) {
        // send back a response of status code 401 (unauthorized) 
        return res.status(401).end();
    }

    // get the token from the last part of the authorization header string like "bearer token-value".
    const token = req.headers.authorization.split(" ")[1];

    // decode the token, using a secret key-phrase, to get the user id 
    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) {return res.status(401).end(); }

        const userId = decoded.sub;

        // check if the user id exists
        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                return res.status(401).ed();
            };

            return next();
        });

    });

};