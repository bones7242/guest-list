const express = require("express");
const bodyParser = require("body-parser");

const Venue = require("mongoose").model("Venue");
const Event = require("mongoose").model("Event");

const router = new express.Router();

/* 
api routes will go here as needed
*/

router.get("/dashboard/:id", (req, res) => {
    console.log("received api/dashboard/id GET request for:", req.params.id);
    Venue.findOne({owner: req.params.id}, function(err, doc){
        if (err) {
            res.send("error:", err);
        } else {
            res.status(200).json({
                venue: doc
            });
        };
    })
    
}); 

router.post("/event", (req, res) => {
    console.log("received api/event POST request:", req.body);
    // create a new artist record, via the Artist schema, from the request data
    const newEvent = new Event(req.body);
    // save the new artist record 
    newEvent.save((err, doc) => {
        // handle errors with the save.
        if (err) { 
            //check to see if it is a duplicate code
            if (err.code === 11000){
                res.json({message: "that Event is already in the database"})
            } else {
                res.json({message: err})
            };
        // if no errors.
        } else {
            res.status(200).json({
                message: doc
            });
        };
    });
    
}); 


module.exports = router;