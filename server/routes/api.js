const express = require("express");

const router = new express.Router();

/* 
after the user is authenticated, we let them see this route.  since everyone has the same role, they all see this route. 
I suppose this is where I could implement authorization logic to give different routes based on what is in their token when it is validated and their "role" in the database.
*/

router.get("/dashboard", (req, res) => {
    res.status(200).json({
        message: "You're authorized to see this secret message."
    });
});

module.exports = router;