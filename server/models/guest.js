//new attendee log in info from new guest account form
//Added houseList - SupportThreeList Boolean values - Lou
const mongoose = require("mongoose");

console.log("loading Event schema");

// define the User model schema
const GuestSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue"
    },

    name: String,
    // eventually we will connect user ids, but for now we only have "owner" users
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Venue"
    // },
    email: String,
    affiliation: String,
    phone: String,
    plusOne: Number,
    vip: Boolean,
    allAccess: Boolean,
    photoPass: Boolean,
    pressPass: Boolean,
    houseList: Boolean,
    headlinerList: Boolean,
    supportOneList: Boolean,
    supportTwoList: Boolean,
    supportThreeList: Boolean,
    dateAdded: Date,
    timeEntered: Date,
    isCheckedIn: Boolean
    
});


//module.exports = mongoose.model("User", UserSchema);
module.exports = mongoose.model("Guest", GuestSchema);