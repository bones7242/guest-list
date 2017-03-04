const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// define the User model schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: {unique: true }
    },
    password: String,
    name: String
});

/*
Create a schema method that we can use to compare the passed password with the passowrd in the database.
@param {string} password
@returns {object} callback
*/

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    bcrypt.compare(password, this.password, callback);
};

// The pre-save hook method. this will hash the user's password and will be executed before the user's info is saved to the db.
UserSchema.pre("save", function saveHook(next) {
    const user = this;
    // proceed further only if the password is modified or the user is new
    if (user.isModified("password") === false) return next();
    // generate a salt string to use for hashing 
    return bcrypt.genSalt((saltError, salt) => {
        // if there is an error with getting the sale, return the error 
        if(saltError) { return next(saltError); }
        // generate a hashed version of the user's password 
        return bcrypt.hash(user.password, salt, (hashError, hash) => {
            // if there is an error with the hash generation return the error  
            if (hashError) {return next(hashError); }
            // replace the password string with the hash password value
            user.password = hash;
            // return 
            return next();
        });
    });
});

module.exports = mongoose.model("User", UserSchema);