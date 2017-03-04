// this module will hold the database connection

const mongoose = require("mongoose");

module.exports.connect = (uri) => {
    // connect to the database 
    mongoose.connect(uri);
    // plug in the promise library.
    mongoose.Promise = global.Promise;  //Note: replace with bluebird

    // check for connection error
    mongoose.connection.on("error", (err) => {
        console.error(`Mongoose connection error: ${err}`);
        process.exit(1);
    });
    // check for successful connection
    mongoose.connection.once("open", () => {
        console.log("Mongoose connection successful.");
    })

    // Load models.
    require("./user");
}