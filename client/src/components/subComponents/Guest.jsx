import React, { PropTypes, Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { refreshActiveEvent, fetchEvents } from "../../actions/index";

import Auth from "../../modules/Auth";

const Promise = require("bluebird");

class Guest extends Component {
	constructor(props){
		console.log("asdfasdfasdfasdf", props);
		// get parent props 
		super(props);
		// bind this to functions in this component 
		this.checkInGuest = this.checkInGuest.bind(this);
	}
	// helper method to update the event in the database.  if successfull, it tells redux to fetch the newest events list and activeEvent.  The user stays on this event page.
    checkInGuest(event){
		// Prevent default action.  in this case, action is the form submission event.
        event.preventDefault();
		// create the update object 
		const checkInObject = {
			eventId: this.props.guest.eventId,
			plusOne: this.props.guest.plusOne,
		}
		console.log("checkInGuest called:", checkInObject);
        // add the new event to the mongo database 
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", "/api/event/counter/increment");
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
				console.log("success! response:", xhr.response)
				alert("Guest was successfully checked in.");
				// update the "active event"" in the application state
				this.props.refreshActiveEvent(this.props.activeEvent._id, Auth.getToken());
				// update the specific event in the "events"array in the applicaiton state  
				this.props.fetchEvents(this.props.activeEvent.venue, Auth.getToken());
				// diable this button


            } else {
				console.log("there was an error in creating the event. error message:", xhr.response.message)
				alert("Event could not be added.  Check the console logs");
			};
        });
        xhr.send(JSON.stringify(checkInObject)); //note: stringify an issue for numbers?
    }

	render(){
		
		//otherwise...
		return (
			<tr className="grey darken-4 bordered">
				<td className="white-text text-blue-grey lighten-5 hoverable">{this.props.guest.name}</td>
				<td className="white-text text-blue-grey lighten-5">{this.props.guest.affiliation}</td>
				<td className="white-text text-blue-grey lighten-5">{this.props.guest.plusOne}</td>
				<td>
					{this.props.guest.vip}
					{this.props.guest.allAccess}
					{this.props.guest.photoPass}
					{this.props.guest.pressPass}
				</td>
				<td>
					{this.props.guest.houseList && <p>House</p>}
					{this.props.guest.headlinerList && <p>{this.props.activeEvent.headliner}</p>}
					{this.props.guest.supportOneList && <p>{this.props.activeEvent.supportOne}</p>}
					{this.props.guest.supportTwoList && <p>{this.props.activeEvent.supportTwo}</p>}
					{this.props.guest.supportThreeList && <p>{this.props.activeEvent.supportThree}</p>}
				</td>
				<td>
					<button className="waves-effect waves-light btn deep-purple darken-3 hoverable" onClick={this.checkInGuest}>ENTERED</button>
				</td>
				<td>
					
					<a className="btn-floating btn-small waves-effect waves-light blue-grey lighten-2 hoverable" style={{margin:"3px"}}><i className="material-icons">delete</i></a>
					
					<a className="btn-floating btn-small waves-effect waves-light blue-grey lighten-2 hoverable" style={{margin:"3px"}}><i className="material-icons">shuffle</i></a>
				</td>
			</tr>
		);
	}		
}

function mapStateToProps(state) {
	// whatever is returned will be mapped to the props of this component
	return {
		activeEvent: state.activeEvent,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ refreshActiveEvent, fetchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Guest);
