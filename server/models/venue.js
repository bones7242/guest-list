//VENUE INFO FROM VENUE SIGNUP FORM
const mongoose = require("mongoose");
console.log("test2");

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
    }
});

module.exports = mongoose.model("Venue", VenueSchema); 