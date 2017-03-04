// Load dependencies.
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./config");

// Connect to the database and load models.
require("./server/models").connect(config.dbUri); 

// Define variable to hold express().
const app = express();
// Tell app to look for static files in the below directories .
app.use(express.static("./server/static/"));
app.use(express.static("./client/dist/"));
// Tell the app to parse HTTP body mesages.
app.use(bodyParser.urlencoded({ extended: false}));
// Pass the passport middleware.
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
app.use("/auth", authRoutes); 
app.use("/api", apiRoutes); 

// server-site route that directs http routes back to the react app
app.get("/*", function(req, res) {
    res.sendFile(__dirname + '/server/static/index.html')
})

// Define the port. 
const PORT = process.env.PORT || 3000;

// Start the server.
app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
})