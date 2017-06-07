/* This component will be rendered in the content container depending on the route.  It will import the event's current information and provide functionality to update that information. */

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Auth from '../modules/Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchEvents, selectEvent } from '../actions/index';
import DefaultSplash from '../components/DefaultSplash.jsx';

class EditEvent extends Component {

  constructor(props) {
    super(props);
    if (this.props.activeEvent) {
      this.state = {
        updatedEvent: this.props.activeEvent,
      };
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.processEventForm = this.processEventForm.bind(this);
    this.updateEvent = this.updateEvent.bind(this);
  }

  handleInputChange(event) {
    const field = event.target.name;
    const updatedEvent = this.state.updatedEvent;
    updatedEvent[field] = event.target.value;
    this.setState({
      updatedEvent,
    });
  }

  processEventForm(event) {
    event.preventDefault();
    // do basic front-end checks to make sure form was filled out correctly
    const updatedEvent = this.state.updatedEvent;
    // create the event
    this.updateEvent(updatedEvent);
  }

  updateEvent(updatedEvent){
    // add the new event to the mongo database
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', '/api/event/edit');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.props.fetchEvents(this.props.venue._id, Auth.getToken());
        this.props.selectEvent(xhr.response.updatedEvent);
        this.props.router.push('/dash/event');
      } else {
        console.log('there was an error in creating the event. error:', xhr.response.message)
      }
    });
    xhr.send(JSON.stringify(updatedEvent));
  }

  render() {
    // check to make sure an event is selected
    if (!this.props.activeEvent) {
      return (
        <DefaultSplash message="Select an event to edit it" />
      );
    }
    // if an event is selected, show the edit event form
    return (
      <div className="row">
        <div className="col s12">
          <h3 className="center-align">Edit Event</h3>
          <form action="/" onSubmit={this.processEventForm} className="dashboard-form" id="edit-event-form">
            <div className="row" style={{ paddingTop: '20px' }}>
              <div className="col s6">
                <label htmlFor="headliner">Headliner *</label>
                <input name="headliner" onChange={this.handleInputChange} value={this.state.updatedEvent.headliner} type="text" className="validate" />
              </div>
              <div className="col s3">
                <label htmlFor="date">Date *</label>
                <input type="text" name="date" value={this.state.updatedEvent.date} onChange={this.handleInputChange} />
              </div>
              <div className="col s2">
                <label htmlFor="time">Time *</label>
                <input type="text" name="time" value={this.state.updatedEvent.time} onChange={this.handleInputChange} />
              </div>
              <div className="col s1">
                <label htmlFor="am_pm">AM/PM *</label>
                <input type="text" name="am_pm" value={this.state.updatedEvent.am_pm} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="row">
              <div className=" col s4">
                <label htmlFor="supportOne">First Support</label>
                <input name="supportOne" type="text" className="validate" value={this.state.updatedEvent.supportOne} onChange={this.handleInputChange}></input>
              </div>
              <div className=" col s4">
                <label htmlFor="supportTwo">Second Support</label>
                <input name="supportTwo" type="text" className="validate" value={this.state.updatedEvent.supportTwo} onChange={this.handleInputChange}></input>
              </div>
              <div className=" col s4">
                <label htmlFor="supportThree">Third Support</label>
                <input name="supportThree" type="text" className="validate" value={this.state.updatedEvent.supportThree} onChange={this.handleInputChange}></input>
              </div>
            </div>
            <div className="row">
              <div className=" col s3">
                <label htmlFor="headlinerAllotment">Headliner Allotment</label>
                <input name="headlinerAllotment" type="text" className="validate" value={this.state.updatedEvent.headlinerAllotment} onChange={this.handleInputChange} />
              </div>
              <div className=" col s3">
                <label htmlFor="supportOneAllotment">First Support Allotment</label>
                <input name="supportOneAllotment" type="text" className="validate" value={this.state.updatedEvent.supportOneAllotment} onChange={this.handleInputChange} />
              </div>
              <div className=" col s3">
                <label htmlFor="supportTwoAllotment">Second Support Allotment</label>
                <input name="supportTwoAllotment" type="text" className="validate" value={this.state.updatedEvent.supportTwoAllotment} onChange={this.handleInputChange} />
              </div>
              <div className=" col s3">
                <label htmlFor="supportThreeAllotment">Third Support Allotment</label>
                <input name="supportThreeAllotment" type="text" className="validate" value={this.state.updatedEvent.supportThreeAllotment} onChange={this.handleInputChange} />
              </div>
            </div>
          </form>
          <div className="row valign-wrapper" >
            <div className="col s6 right-align" >
              <Link className="grey darken-2 waves-effect waves-light btn center-align hoverable" to={'/dash/event'}>Cancel</Link>
            </div>

            <div className="col s6 left-align" >
              <button type="submit" form="edit-event-form" className="blue accent-2 waves-effect waves-light btn hoverable center-align">Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditEvent.propTypes = {
  activeEvent: PropTypes.object.isRequired,
  venue: PropTypes.object.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  selectEvent: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    venue: state.venue,
    activeEvent: state.activeEvent,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchEvents, selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);
