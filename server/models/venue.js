//VENUE INFO FROM VENUE SIGNUP FORM
const mongoose = require("mongoose");

console.log("loading Venue schema");

// define the User model schema
const VenueSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    addressOne: {
        type: String,
        default: ""
    },
    addressTwo: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    zip: {
        type: String,
        default: ""
    }, 
    phone: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }]
});

module.exports = mongoose.model("Venue", VenueSchema); 