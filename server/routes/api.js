const express = require('express');
const Venue = require('mongoose').model('Venue');
const Event = require('mongoose').model('Event');
const Guest = require('mongoose').model('Guest');

const router = new express.Router();

// require nodemailer
const nodemailer = require('nodemailer');

// configure email Transporter
const smtpTransport = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'appcreate3@gmail.com',
    pass: process.env.EMAIL_PASS || 'CreateCreate',
  },
});

// email route
// sending automatic email with nodemailer for a created guest
router.post('/email', (req, res) => {  // send an email message.
  // creating the message
  const mailOptions = {
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text,
  };
  console.log('received api/email POST request. Mail options:', mailOptions);
  // sending the message using smtpTransport
  smtpTransport.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error });
    } else {
      console.log('email sent.', response);
      res.status(200).json({ message: 'email successfully sent', details: response });
    }
  });
});

// 'VENUE' CRUD ROUTES
// venue route - get all info on a venue by owner (user) id
router.get('/venue/:user_id', (req, res) => {
  console.log('received api/venue/:user_id GET request for:', req.params.user_id);
  Venue.findOne({ owner: req.params.user_id })
  .populate({
    path: 'events',
    populate: {
      path: 'guests',
    },
  })
  .exec((err, doc) => {
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(200).json({ venue: doc });
    }
  });
});
// venue route - update a venue
router.put('/venue', (req, res) => {
  console.log('received api/venue PUT request', req.body);
    // update the event record
  Venue.findOneAndUpdate(
    { _id: req.body._id },  // find using this filter
    { $set: req.body },  // make this update
    { new: true },
    (error, doc) =>  {
      if (error) {
        res.status(500).json({ message: error });
      } else {
        console.log('response from db', doc);
        res.status(200).json({ updatedEvent: doc });
      }
    },
  );
});

// 'EVENT' CRUD ROUTES
// event route - create an event
router.post('/event', (req, res) => {
  console.log('received api/event POST request:', req.body);
  // create a new event record, via the Event schema
  const newEvent = new Event(req.body);
  // save the new event record
  newEvent.save((err, doc) => {
    // handle errors with the save.
    if (err) {
      // check to see if it is a duplicate code
      if (err.code === 11000) {
        res.status(500).json({ message: 'that Event is already in the database' });
      } else {
        console.log('error:', err);
        res.status(500).json({ message: err });
      }
    } else {
      // push the id of this new event to the owning venue
      Venue.findOneAndUpdate(
        { _id: req.body.venue },
        { $push: { events: doc._id } },
        { new: true },
        (error, document) => {
          if (error) {
            res.send(error);
          } else {
            res.status(200).json({ newEvent: doc });
          }
        },
      );
    }
  });
});
// event route - read info for one event by that event's id
router.get('/event/one/:eventId', (req, res) => {
  console.log('received api/event/one GET request:', req.params.eventId);
  Event.findOne({
    _id: req.params.eventId,
  })
  .populate('guests')
  .exec((err, docs) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.status(200).json({ event: docs });
    }
  });
});
// event route - read all events by venue id
router.get('/event/all/:venueId', (req, res) => {
  console.log('received api/event/all GET request:', req.params.venueId);
  Event.find({
    venue: req.params.venueId,
  })
  .limit(100)
  .sort({ date: -1 })
  .populate('guests')
  .exec((err, docs) => {
    if (err) {
      res.json({ message: err });
    } else {
      res.status(200).json({ events: docs });
    }
  });
});
// event route - update an event
router.put('/event/edit', (req, res) => {
  console.log('received api/event PUT request', req.body);
  Event.findOneAndUpdate(
    { _id: req.body._id },  // find using this filter
    { $set: req.body },  // make this update
    { new: true })
  .populate('guests')
  .exec((error, doc) => {
    if (error) {
      res.send(error);
    } else {
      console.log('response from db', doc);
      res.status(200).json({ updatedEvent: doc });
    }
  });
});
// event route - delete an event by that event's id
router.delete('/event/:eventId', (req, res) => {
  console.log('received api/event/one GET request:', req.params.eventId);
  Event.findByIdAndRemove(req.params.eventId, (err) => {
    if (err) {
      res.status(200).json({ message: err });
    } else {
      res.status(200).json({ message: 'event ' + req.params.eventId + ' successfully deleted.' });
    }
  });
});

// 'GUEST' CRUD ROUTES
// route to create a new guest
router.post('/guest', (req, res) => {
  console.log('received api/guest POST request:', req.body);
  const newGuest = new Guest(req.body);
  newGuest.save((err, doc) => {
    console.log('doc saved:', doc);
    if (err) {
      // check to see if it is a duplicate code
      if (err.code === 11000) {
          res.status(500).json({ message: 'that guest is already in the database' });
        } else {
          res.status(500).json({ message: err });
        }
    } else {
      // push this guest id to the event as a guest
      Event.findOneAndUpdate(
        { _id: req.body.eventId },
        { $push: { 'guests': doc._id } },
        { new: true },
        (error, document) => {
          if (error) {
            res.send(error);
          } else {
            res.status(200).json({ message: doc });
          }
        },
      );
    }
  });
});
// guest route - get guest info for one guest by id
router.get('/guest/one/:guest_id', (req, res) => {
  console.log('received api/guest/one/:guest_id GET request for:', req.params.guest_id);
  Guest.findOne({ _id: req.params.guest_id }, (err, guestInfo) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).json(guestInfo);
    }
  });
});
// guest route - check in a guest
router.put('/guest/checkin', (req, res) => {
  console.log('received api/guest/checkin PUT request', req.body);
  Guest.findOneAndUpdate(
    { '_id': req.body.guestId },
    { $set: { isCheckedIn: true } },
    { new: true },
    (checkinError, checkinDoc) =>  {
      console.log('checkin doc', checkinDoc);
      if (checkinError) {
        res.status(500).json(checkinError);
      } else {
        res.status(200).json({ updatedGuest: checkinDoc });
      }
    },
  );
});
// guest route - check out a guest
router.put('/guest/checkout', (req, res) => {
  console.log('received api/guest/checkout PUT request', req.body);
  Guest.findOneAndUpdate(  // check in the guest
    { _id: req.body.guestId },
    { $set: { 'isCheckedIn': false } },
    { new: true },
    (checkoutError, checkoutDoc) =>  {  // callback
      console.log('checkout doc', checkoutDoc);
      if (checkoutError) {  // handle errors
        res.status(500).json(checkoutError);
      } else { // if sucessfull, send response
        res.status(200).json({ updatedGuest: checkoutDoc });
      }
    },
  );
});
// guest route - update a guest by guest id
router.put('/guest/one', (req, res) => {
  console.log('received api/guest/one PUT request.');
  Guest.findOneAndUpdate(
    { '_id': req.body._id },
    { $set: req.body },  // make this update
    { new: true },
    (err, updatedGuestInfo) =>  {
      if (err) {
        res.send(err);
      } else {
        res.status(200).json(updatedGuestInfo);
      }
    },
  );
});
// guest route - delete a guest by guest id
router.delete('/guest/one/:guest_id', (req, res) => {
  console.log('received api/guest/one/:guest_id DELETE request.');
  Guest.findByIdAndRemove(req.params.guest_id, (err) => {
    if (err) { // handle errors
      res.status(200).json({ message: err });
    } else {  // if no errors.
      res.status(200).json({ message: 'guest ' + req.params.guest_id + ' successfully deleted.' });
    }
  });
});

module.exports = router;
