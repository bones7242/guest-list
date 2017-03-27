import React, { PropTypes, Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router';
import moment from 'moment';

import DefaultSplash from "./DefaultSplash.jsx";
  
class DashboardHeader extends Component {
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
            <div className="row">

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
                    <Link className="gl-btn-tertiary btn-floating btn-small waves-effect waves-light hoverable">
                        <i className="material-icons">delete</i>
                    </Link>
                    <Link className="gl-btn-tertiary btn-floating btn-small waves-effect waves-light hoverable" to="/dash/edit-event">
                        <i className="material-icons">mode_edit</i>
                    </Link>
                </div>
                
            </div>
        );
    }
}



function mapStateToProps(state) {

	// whatever is returned will be mapped to the props of this component
	return {
		activeEvent: state.activeEvent
	};
}

export default connect(mapStateToProps)(DashboardHeader);