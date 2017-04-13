// Load dependencies.
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./config");


// Connect to the database and load models.
var mongoose = require("mongoose");
mongoose.connect(config.dbUri); 
require("./server/models/user");
require("./server/models/venue");
require("./server/models/artist");
require("./server/models/event");
require("./server/models/guest");


//mongoose.connect('mongodb://<lkane>:<adminadmin>@ds141490.mlab.com:41490/guestmate'); 

// Define variable to hold express().
const app = express();
// Tell app to look for static files in the below directories .
app.use(express.static("./server/static/"));
app.use(express.static("./client/dist/"));
// Tell the app to parse HTTP body mesages.
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
// Pass the passport middleware.


var env = process.env.NODE_ENV || "development";


app.use(passport.initialize());



// Load passport strategies.
const localSignupStrategy = require("./server/passport/local-signup");
const localLoginStrategy = require("./server/passport/local-login");
passport.use("local-signup", localSignupStrategy);
passport.use("local-login", localLoginStrategy);

// pass the authentication checker middleware.
// we puth this here so that we can be sure that the middleware function will be executed before proceeding to any /api routes below.
const authCheckMiddleware = require("./server/middleware/auth-check");
app.use("/api", authCheckMiddleware);

// Routes.
const authRoutes = require("./server/routes/auth"); 
const apiRoutes = require("./server/routes/api"); 
const publicApiRoutes = require("./server/routes/public-api"); 
app.use("/auth", authRoutes); 
app.use("/api", apiRoutes); 
app.use("/public-api", publicApiRoutes); 

// server-site route that directs http routes back to the react app.
app.get("/*", function(req, res) {
    res.sendFile(__dirname + '/server/static/index.html')
})

// Define the port. 
const PORT = process.env.PORT || 3000;

// Start the server.
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
})