// react
import React, { PropTypes, Component } from 'react';
import { Link } from "react-router";
// redux 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { refreshActiveEvent, fetchEvents, refreshActiveGuest } from "../actions/index";
// methods 
import Auth from "../modules/Auth";

const Promise = require("bluebird");

class Guest extends Component {
	constructor(props){
		// get parent props 
		super(props);
		// set the state 
		this.state = {
			checkedIn: this.props.guest.isCheckedIn
		}
		
		// bind this to functions in this component 
		this.checkInGuest = this.checkInGuest.bind(this);
		this.editGuest = this.editGuest.bind(this);
		this.deleteGuest = this.deleteGuest.bind(this);
	}

	// helper method to update the event in the database.  if successfull, it tells redux to fetch the newest events list and activeEvent.  The user stays on this event page.
    checkInGuest(event){
		// Prevent the default action (which is the form submission event)
        event.preventDefault();
		
		// create the update object 
		const checkInObject = {
			guestId: this.props.guest._id,
			eventId: this.props.guest.eventId,
			plusOne: this.props.guest.plusOne,
		}

		// decide wheter to increment or decriment guests 
		let queryUrl = "";
		if (this.props.guest.isCheckedIn === false){
			queryUrl = "/api/guest/checkin";
		} else {
			queryUrl = "/api/guest/checkout";
		}

        // add the new event to the mongo database 
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", queryUrl);
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
				// update the "active"event in the application state
				this.props.refreshActiveEvent(this.props.activeEvent._id, Auth.getToken());
				// update the specific event in the "events"array in the application state
				this.props.fetchEvents(this.props.activeEvent.venue, Auth.getToken());
            } else {
				console.log("there was an error in updating the event. error message:", xhr.response)
				//alert("Event could not be updated.  Check the console logs.");
			};
        });
        xhr.send(JSON.stringify(checkInObject)); //note: stringify an issue for numbers?
    }

	editGuest(){
		//refresh the active event 
		this.props.refreshActiveGuest(this.props.guest._id, Auth.getToken())
	}

	deleteGuest(){
		const xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/api/guest/one/" + this.props.guest._id);
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
				// update the "active" event in the application state
				this.props.refreshActiveEvent(this.props.activeEvent._id, Auth.getToken());
				// update the specific event in the "events"array in the application state
				this.props.fetchEvents(this.props.activeEvent.venue, Auth.getToken());
            } else {				
				console.log("Guest could not be deleted.  Check the server console logs");
			};
        });
        xhr.send();
	}

	myColor(){
		if (this.props.guest.isCheckedIn === true) { 
			return "grey darken-2";
		} else { 
			return "blue accent-2";
		}
	}

	myText() {
		if (this.props.guest.isCheckedIn === true) { 
			return "UNDO";
		} else { 
			return "CHECK IN";
		}
	}

	backgroundColor(){
		if (this.props.guest.isCheckedIn === true) {
			return "#494949";
		} else {
			return "grey darken-3"
		}
	}

	render(){
		
		//otherwise...
		return (
			<tr className={"bordered " + this.backgroundColor()}>

				<td className="guest--td">
					{this.props.guest.name.toUpperCase()}
				</td>

				<td className="guest--td">
					{this.props.guest.affiliation}
				</td>

				<td className="guest--td">
					{this.props.guest.plusOne}
				</td>

				<td className="guest--td">
					{this.props.guest.vip && <p>VIP</p>}
					{this.props.guest.allAccess && <p>All Access</p>}
					{this.props.guest.photoPass && <p>Photo Pass</p>}
					{this.props.guest.pressPass && <p>Press Pass</p>}
				</td>

				<td className="guest--td">
					{this.props.guest.houseList && <p>House</p>}
					{this.props.guest.headlinerList && <p>{this.props.activeEvent.headliner}</p>}
					{this.props.guest.supportOneList && <p>{this.props.activeEvent.supportOne}</p>}
					{this.props.guest.supportTwoList && <p>{this.props.activeEvent.supportTwo}</p>}
					{this.props.guest.supportThreeList && <p>{this.props.activeEvent.supportThree}</p>}
				</td>

				<td className="guest--td center-align">
					<button className={"waves-effect waves-light btn small hoverable " + this.myColor()} onClick={this.checkInGuest}>{this.myText()}</button>
				</td>

				<td className="guest--td right-align">
					<Link className="grey darken-2 btn-floating btn-small waves-effect waves-light hoverable" onClick={this.editGuest} to="/dash/edit-guest"> 
						<i className="material-icons">mode_edit</i>
					</Link>
					<Link className="grey darken-2 btn-floating btn-small waves-effect waves-light hoverable" onClick={this.deleteGuest}> 
						<i className="material-icons">delete</i>
					</Link>
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
	return bindActionCreators({ refreshActiveEvent, fetchEvents, refreshActiveGuest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Guest);