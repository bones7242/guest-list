//VENUE INFO FROM VENUE SIGNUP FORM
const mongoose = require("mongoose");

// define the User model schema
const VenueSchema = new mongoose.Schema({
    name: String,
    addressOne: String,
    addressTwo: String,
    city: String,
    state: String,
    zip: String, 
    phone: String,
    email: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Venue", VenueSchema);