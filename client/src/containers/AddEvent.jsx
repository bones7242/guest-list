/* This container will display inside the content component.  It will provide the form and functionality for adding a new event. */

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents, selectEvent } from '../actions/index';
import Auth from '../modules/Auth'; 
import DefaultSplash from '../components/DefaultSplash.jsx';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    // add default values for the input fields when setting the initial state
    this.state = {
      newEvent: {
        venue: '',
        headliner: 'Headliner Name',
        supportOne: '',
        supportTwo: '',
        supportThree: '',
        date: 'MM/DD/YYYY',
        time: '00:00',
        am_pm: 'PM',
        headlinerAllotment: 0,
        supportOneAllotment: 0,
        supportTwoAllotment: 0,
        supportThreeAllotment: 0,
        totalGuest: 0,
        totalChecked: 0,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.processEventForm = this.processEventForm.bind(this);
    this.createNewEvent = this.createNewEvent.bind(this);
  }
  // Event handler for input elements
  handleInputChange(event) {
    const field = event.target.name;
    const newEvent = this.state.newEvent;
    newEvent[field] = event.target.value;
    this.setState({
      newEvent,
    });
  }
  // Method to check inputs and then initiate the creation of the event.
  processEventForm(event) {
    event.preventDefault();
    // do basic front-end validation
    const newEvent = this.state.newEvent;
    newEvent.venue = this.props.venue._id;
    // create the event
    this.createNewEvent(newEvent);
  }
  // Create the event in the database. If successful, redirect the user to the dashboard.
  createNewEvent(newEvent) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/event');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.props.fetchEvents(this.props.venue._id, Auth.getToken()); // update the 'events' in the application state
        this.props.selectEvent(xhr.response.newEvent); // select the new activeEvent in the application state
        this.props.router.replace('/dash/event'); // redirect to the dash, to display the new event
      } else {
        alert('Event could not be added. Please contact the site admin.');
      }
    });
    xhr.send(JSON.stringify(newEvent));
  }
  // render the component
  render() {
    // check to make sure a venue is in the props...
    if (!this.props.venue) {
      return (
        <DefaultSplash message="A venue must be selected before you can start adding events" />
      );
    }
    // if a venue is in the props, show the add-event form...
    return (
      <div className="row">
        <div className=" col s12 m12 l12 add-event-form">
          <h3 className="center-align">Add A New Event</h3>
          <form action="/" className="dashboard-form" id="new-event-form" onSubmit={this.processEventForm}>
            <div className="row">
              <div className="col s6">
                <label htmlFor="headliner">Headliner *</label>
                <input name="headliner" type="text" value={this.state.newEvent.headliner} onChange={this.handleInputChange}></input>
              </div>
              <div className="col s3">
                <label htmlFor="date">Date *</label>
                <input type="text" name="date" value={this.state.newEvent.date} onChange={this.handleInputChange}></input>
              </div>
              <div className="col s2">
                <label>Time *</label>
                <input type="text" name="time" value={this.state.newEvent.time} onChange={this.handleInputChange}></input>
              </div>
              <div className="col s1">
                <label>AM/PM *</label>
                <input type="text" name="am_pm" value={this.state.newEvent.am_pm} onChange={this.handleInputChange}></input>
              </div>
            </div>
            <div className="row" >
              <div className="input-field col s4">
                <label htmlFor="supportOne">First Support</label>
                <input name="supportOne" type="text" className="validate" onChange={this.handleInputChange}></input>
              </div>
              <div className="input-field col s4">
                <label htmlFor="supportTwo">Second Support</label>
                <input name="supportTwo"  type="text" className="validate" onChange={this.handleInputChange}></input>
              </div>
              <div className="input-field col s4">
                <label htmlFor="supportThree">Third Support</label>
                <input name="supportThree" type="text" className="validate" onChange={this.handleInputChange}></input>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s3">
                <label htmlFor="headlinerAllotment">Headliner Allotment</label>
                <input name="headlinerAllotment" type="text" className="validate" onChange={this.handleInputChange} />
              </div>
              <div className="input-field col s3">
                <label htmlFor="supportOneAllotment">First Support Allotment</label>
                <input name="supportOneAllotment" type="text" className="validate" onChange={this.handleInputChange}></input>
              </div>
              <div className="input-field col s3">
                <label htmlFor="supportTwoAllotment">Second Support Allotment</label>								
                <input name="supportTwoAllotment" type="text" className="validate" onChange={this.handleInputChange}></input>
              </div>
              <div className="input-field col s3">
                <label htmlFor="supportThreeAllotment">Third Support Allotment</label>
                <input name="supportThreeAllotment" type="text" className="validate" onChange={this.handleInputChange}></input>
              </div>
            </div>
          </form>
          {/*buttons*/}
          <div className="row">
            <div className="col s6 right-align" >
              <Link className="grey darken-2 waves-effect waves-light btn hoverable" to={'/'}>Cancel</Link>
            </div>
            <div className="col s6 left-align" >
              <button type="submit" form="new-event-form" className="blue accent-2 waves-effect waves-light btn hoverable center">Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    venue: state.venue,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents, selectEvent }, dispatch);
}

AddEvent.propTypes = {
  venue: PropTypes.object.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  selectEvent: PropTypes.func.isRequired,
  router: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEvent);
