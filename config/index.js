
// define variables (prod or dev)

let dbUri = process.env.MONGODB_URI || "mongodb://localhost/guestList_db";
let jwtSecret = process.env.JWTSECRET || "notsosecret";

module.exports = {
    dbUri: dbUri,  // this is the location of the mongo DB
    jwtSecret: jwtSecret // this a seed used to hash sensitive material
}