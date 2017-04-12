const express = require("express");
const bodyParser = require("body-parser");

const Venue = require("mongoose").model("Venue");
const Event = require("mongoose").model("Event");
const Guest = require("mongoose").model("Guest");

const router = new express.Router();

// require nodemailer 
const nodemailer = require('nodemailer');

// configure email Transporter
const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:"appcreate3@gmail.com",
        pass:"CreateCreate"
    }
});

// 'VENUE' CRUD ROUTES 
// venue route - get all info on a venue by owner (user) id 
router.get("/venue/:user_id", (req, res) => {
    console.log("received api/venue/:user_id GET request for:", req.params.user_id);
    Venue.findOne({owner: req.params.user_id}).
    populate({
            path: "events",
            populate: {
                path: "guests"
            }
        }
    ).
    exec((err, doc) => {
        // handle errors 
        if (err) {
            res.status(500).json({message: err});
        // if no errors 
        } else {
            res.status(200).json({venue: doc});
        };
    });
}); 
// venue route - update a venue  
router.put("/venue", (req, res) => {
    console.log("received api/venue PUT request", req.body);
    // update the event record 
    Venue.findOneAndUpdate(
        {"_id": req.body._id},  // find using this filter 
        {$set: req.body},  // make this update 
        {
            new: true // return updated rather than original doc 
        },  
        function(error, doc){
            if (error){
                res.status(500).json({message: error});
            } else {
                console.log("response from db", doc);
                res.status(200).json({updatedEvent: doc}); 
            };
        }
    );
}); 

// 'EVENT' CRUD ROUTES 
// event route - create an event 
router.post("/event", (req, res) => {
    console.log("received api/event POST request:", req.body);
    // create a new event record, via the Event schema
    const newEvent = new Event(req.body);
    // save the new event record 
    newEvent.save((err, doc) => {
        // handle errors with the save.
        if (err) { 
            //check to see if it is a duplicate code
            if (err.code === 11000){
                res.status(500).json({message: "that Event is already in the database"})
            } else {
                console.log("error:", err)
                res.status(500).json({message: err})
            };
        // if no errors.
        } else {
            // push the id of this new event to the owning venue
            Venue.findOneAndUpdate(
                {"_id": req.body.venue},
                {$push: {"events": doc._id}},
                {new: true},
                function(error, document){
                    if (error){
                        res.send(error);
                    } else {
                        res.status(200).json({ newEvent: doc }); 
                    };
                }
            );
        };
    });    
}); 
// event route - read info for one event by that event's id 
router.get("/event/one/:eventId", (req, res) => {
    console.log("received api/event/one GET request:", req.params.eventId);
    // finding all events where the venue matches the venueId, and populate the guests in the event 
    Event.findOne({
            _id: req.params.eventId
        }).
        populate("guests").
        exec((err, docs) => {
            // handle errors with the save.
            if (err) { 
                res.json({message: err})
            // if no errors.
            } else {
                res.status(200).json({event: docs});
            };
        });    
}); 
// event route - read all events by venue id 
router.get("/event/all/:venueId", (req, res) => {
    console.log("received api/event/all GET request:", req.params.venueId);
    // finding all events where the venue matches the venueId, and populate the guests in the event 
    Event.find({
            venue: req.params.venueId
        }).
        limit(100).
        sort({ date: -1 }).
        populate("guests").
        exec((err, docs) => {
            // handle errors with the save.
            if (err) { 
                res.json({ message: err })
            // if no errors.
            } else {
                res.status(200).json({ events: docs });
            };
        });    
}); 
// event route - update an event 
router.put("/event/edit", (req, res) => {
    console.log("received api/event PUT request", req.body);
    // update the event record 
    Event.findOneAndUpdate(
        {"_id": req.body._id},  // find using this filter 
        {$set: req.body},  // make this update 
        {
            new: true // return updated rather than original 
        },  
        function(error, doc){
            if (error){
                res.send(error);
            } else {
                console.log("response from db", doc);
                res.status(200).json({updatedEvent: doc}); 
            };
        }
    );
}); 
// event route - delete an event by that event's id 
router.delete("/event/:eventId", (req, res) => {
    console.log("received api/event/one GET request:", req.params.eventId);
    // finding all events where the venue matches the venueId, and populate the guests in the event 
    // Use the Beer model to find a specific beer and remove it
    Event.findByIdAndRemove(req.params.eventId, (err) => {
        // handle errors with the save.
        if (err) { 
            res.status(200).json({message: err})
        // if no errors.
        } else {
            res.status(200).json({message: "event " + req.params.eventId + " successfully deleted."});
        };
    });    
}); 

// 'GUEST' CRUD ROUTES
// route to create a new guest
router.post("/guest", (req, res) => {
    console.log("received api/guest POST request:", req.body);
    // create a new guest record, via the guest schema, from the request data
    const newGuest = new Guest(req.body);
    // save the new guest record 
    newGuest.save((err, doc) => {
        //console.log("err:", err)
        console.log("doc saved:", doc)
        // handle errors with the save.
        if (err) { 
            //check to see if it is a duplicate code
            if (err.code === 11000){
                res.status(500).json({message: "that guest is already in the database"})
            } else {
                res.status(500).json({message: err})
            };
        // if no errors.
        } else {
            /* send an email message. note: put in its own route  
            // sending automatic email with nodemailer for a created guest
            // creating the message 
            const mailOptions={
                to: doc.email,
                subject: " You have been invited to event ",
                text: " This the Text of your invite this should have all the information reguarding the show "
            }
            //sending the message using smtpTransport
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    console.log(error);
                    res.end("error");
                }else{
                    console.log("Message sent : " + response.message);
                }
            });
            */

            //push this guest id to the event as a guest 
            Event.findOneAndUpdate(
                {"_id": req.body.eventId},
                {
                    $push: {"guests": doc._id}
                },
                {new:true},
                function(error, document){
                    console.log(document + "guests events doc");
                    if (error){
                        res.send(error);
                    } else {
                       res.status(200).json({ message: doc }); 
                    }
                }
            )
        };
    });
}); 
//guest route - get guest info for one guest by id
router.get("/guest/one/:guest_id", (req, res) => {
    console.log("received api/guest/one/:guest_id GET request for:", req.params.guest_id);
    Guest.findOne({_id: req.params.guest_id}, function(err, guestInfo){
        if (err) {
            res.send(err);
        } else {
            res.status(200).json(guestInfo);
        };
    })
}); 
// guest route - check in a guest 
router.put("/guest/checkin", (req, res) => {
    console.log("received api/guest/checkin PUT request", req.body);
    Guest.findOneAndUpdate(
        {"_id": req.body.guestId},
        {
            $set: {"isCheckedIn": true}
        },
        { new: true},
        function(checkinError, checkinDoc){
            console.log("checkin doc", checkinDoc);
            if (checkinError){
                res.status(500).json(checkinError);
            } else {
                res.status(200).json({updatedGuest: checkinDoc}); 
            }
        }
    )
});
// guest route - check out a guest 
router.put("/guest/checkout", (req, res) => {
    console.log("received api/guest/checkout PUT request", req.body);          
    Guest.findOneAndUpdate(  // check in the guest 
        {"_id": req.body.guestId},
        {
            $set: {"isCheckedIn": false}
        },
        { new: true},
        function(checkoutError, checkoutDoc){  // callback
            console.log("checkout doc", checkoutDoc);
            if (checkoutError){  // handle errors 
                res.status(500).json(checkoutError);
            } else { // if sucessfull, send response 
                res.status(200).json({ updatedGuest: checkoutDoc }); 
            }
        }
    )
});
//guest route - update a guest by guest id
router.put("/guest/one", (req, res) => {
    console.log("received api/guest/one PUT request.");
    // update the guest record 
    Guest.findOneAndUpdate(
        {"_id": req.body._id},
        {$set: req.body},  // make this update 
        {
            new: true // return updated rather than original 
        }, 
        function(err, updatedGuestInfo){
            if (err) {
                res.send(err);
            } else {
                res.status(200).json(updatedGuestInfo);
            };
        }
    );
}); 
// guest route - delete a guest by guest id
router.delete("/guest/one/:guest_id", function(req, res) {
    console.log("received api/guest/one/:guest_id DELETE request.");
    // remove the guest record 
    Guest.findByIdAndRemove(req.params.guest_id, (err, updatedGuestInfo) => {
        if (err) { // handle errors
            res.status(200).json({message: err})
        } else {  // if no errors.
            res.status(200).json({message: "guest " + req.params.guest_id + " successfully deleted."});
        };
    }); 
}); 


module.exports = router;