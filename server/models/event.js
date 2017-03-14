//EVENT DATA BASE FOR EACH VENUE (SIDE BAR LIST)
const mongoose = require("mongoose");

console.log("loading Event schema");

// define the User model schema
const EventSchema = new mongoose.Schema({
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue"
    },
    headliner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist"
    },
    supportOne: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist"
    },
    supportTwo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist"
    },
    supportThree: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist"
    },
    date: Date,
    time: Number,
    headlinerAllotment: Number,
    supportOneAllotment: Number,
    supportTwoAllotment: Number,
    supportThreeAllotment: Number,
    totalGuestOnList: Number,
    guestIDArray: String,
    
});

module.exports = mongoose.model("Event", EventSchema);