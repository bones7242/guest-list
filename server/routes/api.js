const express = require("express");
const Venue = require("mongoose").model("Venue");

const router = new express.Router();

/* 
api routes will go here as needed
*/

router.get("/dashboard/:id", (req, res) => {
    console.log("received api/dashboard/id request for:", req.params.id);
    Venue.findOne({owner: req.params.id}, function(err, doc){
        if (err) {
            res.send("error:", err);
        } else {
            res.status(200).json({
                message: doc
            });
        };
    })
    
});


module.exports = router;