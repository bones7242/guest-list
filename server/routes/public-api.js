const express = require("express");
const bodyParser = require("body-parser");

const Venue = require("mongoose").model("Venue");
const Artist = require("mongoose").model("Artist");
const Event = require("mongoose").model("Event");

const router = new express.Router();

// public routes.  UNSECURE.  for development and testing only

router.post("/venue", (req, res) => {
    //console.log("received /public-api/venue POST request");
}); 

// route for creating a new artist in the database 
router.post("/artist", (req, res) => {

    console.log("received /public-api/artist POST request:", req.body);
    // create a new artist record, via the Artist schema, from the request data
    const newArtist = new Artist(req.body);
    // save the new artist record 
    newArtist.save((err, doc) => {
        // handle errors with the save.
        if (err) { 
            //check to see if it is a duplicate code
            if (err.code === 11000){
                res.json("that Artist is already in the database")
            } else {
                res.json(err)
            };
        // if no errors.
        } else {
            res.json("artist successfully added");
        };
    });
}); 

// router.post("/event", (req, res) => 
//     console.log("received /public-api/event POST request");
// 


router.get("/event/:eventId", (req, res) => {
    console.log("received api/event GET request:", req.params.eventId);
    // finding all guest where the venue matches the venueId
    Event.find({
            _id: req.params.eventId
        }).
        limit(10).
        sort({ date: -1 }).
        populate("guests").
        exec((err, docs) => {
            // handle errors.
            if (err) { 
                res.json({message: err})
            // if no errors.
            } else {
                res.status(200).json({
                    message: docs
                });
            };
        });    
}); 



module.exports = router;