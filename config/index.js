
module.exports = {
    dbUri: "mongodb://localhost/react_app",  // this is the location of the mongo DB.  it currently points to your local mong db.  we will update it to point to our heroku's mongo db and rename to "guestList_db"
    jwtSecret: "notsosecret" // this is a secret work that is used to hash our passwords 
}