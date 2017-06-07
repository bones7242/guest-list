const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: String,  // note: we should break into fname lname
  email: {
    type: String,
    index: { unique: true },
  },
  password: String,
  role: String,  // options: "owner", "guest", etc.
});

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

// pre-save hook method to hash the user's password before the user's info is saved to the db.
UserSchema.pre('save', function saveHook(next) {
  const user = this;
    // proceed further only if the password is modified or the user is new
  if (user.isModified('password') === false) return next();
    // generate a salt string to use for hashing
  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }
    // generate a hashed version of the user's password
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      // if there is an error with the hash generation return the error
      if (hashError) { return next(hashError); }
        // replace the password string with the hash password value
      user.password = hash;
        // return
      return next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
