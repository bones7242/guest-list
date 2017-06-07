const mongoose = require("mongoose");

console.log("loading Artist schema");

// define the User model schema
const ArtistSchema = new mongoose.Schema({
  // basic band info that can be used to contact them
  name: {
    type: String,
    index: {unique: true }
  },
  email: String,
  phone: String,
  // the city that the band wants to publicly claim as where they are from 
  hometownCity: String,
  // the remmittance address is private but the venue can see if band wants to receive checks there 
  remittanceAddressOne: String,
  remittanceAddressTwo: String,
  remittanceCity: String,
  remittanceState: String,
  remittanceZip: String,
  // owner will be the user ID used to link a user as the owner/admin
  owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
});

module.exports = mongoose.model("Artist", ArtistSchema);