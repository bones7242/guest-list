/* This Container will be displayed at the top of the content component.  It will contain all the information for the event that is currently selected. */

// react 
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchEvents, clearActiveEvent } from "../actions/index";
// other dependences 
import moment from 'moment';
// methods 
import Auth from "../modules/Auth";
// components 
import DefaultSplash from "../components/DefaultSplash.jsx";
  
class ContentHeader extends Component {
    constructor(props){
		// get parent props 
		super(props);
		// bind this to methods in this container 
		this.deleteEvent = this.deleteEvent.bind(this);
        this.findTotalGuests = this.findTotalGuests.bind(this);
        this.findCheckedInGuests = this.findCheckedInGuests.bind(this);
	}
	// helper method to delete the currently selected event.  if successful, it redirects the user to the dashboard.
    deleteEvent(event){
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/api/event/" + this.props.activeEvent._id);
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
				// update the events in the applicaiton state
				this.props.fetchEvents(this.props.venue._id, Auth.getToken());
				// select the activeEvent in the application state 
				this.props.clearActiveEvent();
            } else {				
				console.log("Event could not be deleted.  Check the server console logs");
			};
        });
        xhr.send();
    }
    // helper function to tally all the guests and plus-ones for the event 
    findTotalGuests(){
        let guestsArray = this.props.activeEvent.guests;
        let totalGuests = 0;
        for (var i = 0; i < guestsArray.length; i++){
            totalGuests += 1 + guestsArray[i].plusOne;
        };
        return totalGuests;
    }
    // helper function to tally all the guests and plus-ones for the event that have checked in 
    findCheckedInGuests(){
        let guestsArray = this.props.activeEvent.guests;
        let totalCheckedInGuests = 0;
        for (var i = 0; i < guestsArray.length; i++){
            if (guestsArray[i].isCheckedIn === true){
                totalCheckedInGuests += 1 + guestsArray[i].plusOne;
            }
        }
        return totalCheckedInGuests;
    }

    // render component.
    render(){
        // if this.props.book is null, return early
        if (!this.props.activeEvent) {
          return <DefaultSplash message="Select an event to get started" />;
        }
        // otherwise render the full container
        var newEventDate = new Date(this.props.activeEvent.date);
        var eventDate = newEventDate.toDateString();
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
                        {this.props.activeEvent.time + " " + this.props.activeEvent.am_pm}
                    </p> }
                </div>
                <div className="col s4 m4 l3 header--support">
                    { this.props.activeEvent.supportOne && 
                        <div><p className="support-text"><i>With:</i></p>
                        <h5 className="support-name">{this.props.activeEvent.supportOne}</h5> </div>}
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
                    <p>
                        Total checked in:
                    </p>
                    {this.props.activeEvent.guests && <p>
                        {this.findCheckedInGuests()}
                    </p>}
                </div>
                <div className="col s2 m2 l2 right-align">
                    <Link className="grey darken-2 btn-floating btn-small waves-effect waves-light hoverable" to="/dash/edit-event">
                        <i className="material-icons">mode_edit</i>
                    </Link>
                    <Link className="grey darken-2 btn-floating btn-small waves-effect waves-light hoverable" onClick={this.deleteEvent}>
                        <i className="material-icons">delete</i>
                    </Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
	return {
        venue: state.venue,
		activeEvent: state.activeEvent
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchEvents, clearActiveEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentHeader);