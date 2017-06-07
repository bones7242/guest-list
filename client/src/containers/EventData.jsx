/* This Container will be displayed at the top of the content component.
It will contain all the information for the event that is currently selected. */

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents, clearActiveEvent } from '../actions/index';
import DefaultSplash from '../components/DefaultSplash.jsx';

class EventData extends Component {
  constructor(props) {
    super(props);
    this.findTotalGuests = this.findTotalGuests.bind(this);
    this.findCheckedInGuests = this.findCheckedInGuests.bind(this);
}

  findTotalGuests() {
    const guestsArray = this.props.activeEvent.guests;
    let totalGuests = 0;
    for (let i = 0; i < guestsArray.length; i++) {
      totalGuests += (1 + guestsArray[i].plusOne);
    }
    return totalGuests;
  }
  // helper function to tally all the guests and plus-ones for the event that have checked in
  findCheckedInGuests() {
    const guestsArray = this.props.activeEvent.guests;
    let totalCheckedInGuests = 0;
    for (let i = 0; i < guestsArray.length; i++) {
      if (guestsArray[i].isCheckedIn === true) {
        totalCheckedInGuests += (1 + guestsArray[i].plusOne);
      }
    }
    return totalCheckedInGuests;
  }

  render() {
    // if this.props.book is null, return early
    if (!this.props.activeEvent) {
      return <DefaultSplash message="Select an event to get started" />;
    }
    // otherwise render the full container
    const newEventDate = new Date(this.props.activeEvent.date);
    const eventDate = newEventDate.toDateString();
    return (
      <div className="row dashboard-header">
        <div className="col s4 m4 l4 header--headliner ">
          { this.props.activeEvent.headliner && <h2 className="headliner-text">
              {this.props.activeEvent.headliner.toUpperCase()}
          </h2> }
          { this.props.activeEvent && <p>
              {eventDate}
          </p> }
          { this.props.activeEvent && <p>
              {this.props.activeEvent.time + ' ' + this.props.activeEvent.am_pm}
          </p> }
        </div>
        <div className="col s4 m4 l3 header--support">
          { this.props.activeEvent.supportOne &&
            <div><p className="support-text"><i>With:</i></p>
              <h5 className="support-name">{this.props.activeEvent.supportOne}</h5>
            </div>}
          { this.props.activeEvent.supportTwo &&
            <h5 className="support-name">{this.props.activeEvent.supportTwo}</h5> }
          { this.props.activeEvent.supportThree &&
            <h5 className="support-name">{this.props.activeEvent.supportThree}</h5> }
        </div>
        <div className="col s3 m3 l3 header--event-stats">
          <p className="event-stats-text">
              Total guests:
          </p>
          {this.props.activeEvent.guests && <p>
              {this.findTotalGuests()}
          </p>}
          <p>Total checked in:</p>
          {this.props.activeEvent.guests && <p>
              {this.findCheckedInGuests()}
          </p>}
        </div>
        <div className="col s2 m2 l2 right-align">
          <Link className="grey darken-2 btn-floating btn-small waves-effect waves-light hoverable" to="/dash/event">
            <i className="material-icons">reorder</i>
          </Link>
          <Link className="grey darken-2 btn-floating btn-small waves-effect waves-light hoverable" to="/dash/edit-event">
            <i className="material-icons">mode_edit</i>
          </Link>
        </div>
      </div>
    );
  }
}

EventData.propTypes = {
  activeEvent: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    venue: state.venue,
    activeEvent: state.activeEvent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents, clearActiveEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventData);
