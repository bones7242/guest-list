const express = require('express');

const Artist = require('mongoose').model('Artist');
const Event = require('mongoose').model('Event');

const router = new express.Router();

// route for creating a new artist in the database
router.post('/artist', (req, res) => {
  console.log('received /public-api/artist POST request:', req.body);
  const newArtist = new Artist(req.body);
  newArtist.save((err) => {
    if (err) {
      if (err.code === 11000) {
        res.json('that Artist is already in the database');
      } else {
        res.json(err);
      }
    } else {
      res.json('artist successfully added');
    }
  });
});

router.get('/event/:eventId', (req, res) => {
  console.log('received api/event GET request:', req.params.eventId);
  Event.find({
    _id: req.params.eventId,
  })
  .limit(10)
  .sort({ date: -1 })
  .populate('guests')
  .exec((err, docs) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.status(200).json({
        message: docs,
      });
    }
  });
});

module.exports = router;
