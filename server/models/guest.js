
const mongoose = require('mongoose');

const GuestSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
  },

  name: String,
  email: String,
  affiliation: String,
  phone: String,
  plusOne: Number,
  vip: Boolean,
  allAccess: Boolean,
  photoPass: Boolean,
  pressPass: Boolean,
  houseList: Boolean,
  headlinerList: Boolean,
  supportOneList: Boolean,
  supportTwoList: Boolean,
  supportThreeList: Boolean,
  dateAdded: Date,
  timeEntered: Date,
  isCheckedIn: Boolean,
});


// module.exports = mongoose.model("User", UserSchema);
module.exports = mongoose.model('Guest', GuestSchema);
