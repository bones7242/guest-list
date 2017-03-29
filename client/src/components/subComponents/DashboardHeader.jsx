// react 
import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchEvents, clearActiveEvent } from "../../actions/index";
// other dependences 
import moment from 'moment';
// methods 
import Auth from "../../modules/Auth";
// components 
import DefaultSplash from "./DefaultSplash.jsx";
  
class DashboardHeader extends Component {
    constructor(props){
		// get parent props 
		super(props);
		// bind this to functions in this component 
		this.deleteEvent = this.deleteEvent.bind(this);
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
                // redirect to the dash
				//this.props.router.replace("/dash");

            } else {				
				console.log("Event could not be deleted.  Check the server console logs");
			};
        });
        xhr.send();
    }
    // render component.
    render(){
        // if this.props.book is null, return early
        if (!this.props.activeEvent) {
          return <DefaultSplash message="Select an event to get started" />;
        }
        
        var newEventDate = new Date(this.props.activeEvent.date);
        var eventDate = newEventDate.toDateString();
        // var eventTime = newEventDate.getFormattedTime();
        //var eventDate = moment(newEventDate).format("dddd MMM Do YY");
        var eventTime = moment(newEventDate).format("h:mm a");
       
        return (
            <div className="row dashboard-header">

                <div className="col s4 m4 l4 header--headliner">
                    { this.props.activeEvent.headliner && <h2 className="headliner-text">
                        {this.props.activeEvent.headliner}
                    </h2> }
                    { this.props.activeEvent.date && <p>
                        {eventDate}
                    </p> }
                    { this.props.activeEvent.date && <p>
                        {eventTime}
                    </p> }
                </div>

                <div className="col s4 m4 l3 header--support">
                    { this.props.activeEvent.supportOne && 
                        <div><p className="support-text"><i>with</i></p>
                        <h5>{this.props.activeEvent.supportOne}</h5> </div>}
                    { this.props.activeEvent.supportTwo && 
                        <h5>{this.props.activeEvent.supportTwo}</h5> }
                    { this.props.activeEvent.supportThree && 
                        <h5>{this.props.activeEvent.supportThree}</h5> }
                </div>

                <div className="col s3 m3 l3 header--event-stats">
                    <p className="event-stats-text">
                        Total guests:
                    </p>
                    {this.props.activeEvent.totalGuest && <p>
                        {this.props.activeEvent.totalGuest}
                    </p>}
                    <p>
                        Total checked in:
                    </p>
                    {this.props.activeEvent.totalChecked && <p>
                        {this.props.activeEvent.totalChecked}
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

	// whatever is returned will be mapped to the props of this component
	return {
        venue: state.venue,
		activeEvent: state.activeEvent
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchEvents, clearActiveEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);