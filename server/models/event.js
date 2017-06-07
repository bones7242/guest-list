const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
  },
  headliner: String,
  supportOne: String,
  supportTwo: String,
  supportThree: String,
  date: String,
  time: String,
  am_pm: String,
  headlinerAllotment: Number,
  supportOneAllotment: Number,
  supportTwoAllotment: Number,
  supportThreeAllotment: Number,
  guests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guest',
    },
  ],

});

module.exports = mongoose.model('Event', EventSchema);
