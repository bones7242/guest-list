/* This component will render inside the Content component,
depending on the react-router route.  It will display a
basic welcome message and introduction to the application. */

import React from 'react';
import { Link } from 'react-router';

const WelcomePage = () => {
  return (
    <div className="row">
      <div className="col s12">
        <div className="row">
          <div className="col s12">
            <h2 className="center" >Welcome to <i>Guestmate</i></h2>
          </div>
        </div>
        <div className="row" >
          <div className="col s6" >
            <div className="card grey darken-2">
              <div className="card-content white-text">
                <span className="card-title">Create An Event</span>
                <p>To get started, create a new event.  You can do this by clicking the link below, or clicking the shortcut on the left-hand side of this page.</p>
              </div>
              <div className="card-action">
                <Link to="/dash/add-event" >ADD EVENT</Link>
              </div>
            </div>
          </div>
          <div className="col s6" >
            <div className="card grey darken-2">
              <div className="card-content white-text">
                <span className="card-title">Venue Details</span>
                <p>Your venue's details, such as name and address will be forwarded to guests of your events.  To update these details, click below.</p>
              </div>
              <div className="card-action">
                <Link to="/dash/edit-venue" >EDIT VENUE DETAILS</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row" >
          <div className="col s6" >
            <div className="card grey darken-2">
              <div className="card-content white-text">
                <span className="card-title">Guest Lists</span>
                <p>To use or edit your guest lists, click on the name of the headliner/event on the left-hand side of this page.</p>
              </div>
            </div>
          </div>
          <div className="col s6" >
            <div className="card grey darken-2 disabled">
              <div className="card-content white-text">
                <span className="card-title">Edit Preferences</span>
                <p>Coming soon.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
