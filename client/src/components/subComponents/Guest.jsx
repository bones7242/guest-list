import React, { PropTypes, Component } from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchEvents, selectEvent } from "../../actions/index";

import Auth from "../../modules/Auth";

class Guest extends Component {
	constructor(props){
		// get parent props 
		super(props);
		// bind this to functions in this component 
		this.updateCheckIns = this.updateCheckIns.bind(this);
		this.updateEvent = this.updateEvent.bind(this);
	}

	updateCheckIns() { 
		// figure out how many people to check in 
		const newTotalCheckIns = parseInt(this.props.activeEvent.totalChecked) + 1 + parseInt(this.props.guest.plusOne); 
		console.log("new checkin total", this.props.activeEvent.totalChecked, this.props.guest.plusOne, newTotalCheckIns);
		// make sure total checked is not null
		if (typeof newTotalCheckIns != "number"){
			console.log("ERROR: newTotalCheckIns must be a number");
			return;
		}
		// initiate update of the database & app state
		this.updateEvent({
			_id: this.props.activeEvent._id, 
			totalChecked: newTotalCheckIns
		});
	}

	// helper method to update the event in the database.  if successfull, it tells redux to fetch the newest events list and activeEvent.  The user stays on this event page.
    updateEvent(eventUpdates){
		console.log("update event called. event updates:", eventUpdates);
        // add the new event to the mongo database 
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", "/api/event/edit");
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
				console.log("success! response:", xhr.response)
				alert("Event was successfully updated");
				// update the events in the applicaiton state
				this.props.fetchEvents(this.props.venue._id, Auth.getToken());
				// select the updated activeEvent in the application state 
				this.props.selectEvent(xhr.response.updatedEvent);
            } else {
				console.log("there was an error in creating the event. error message:", xhr.response.message)
				alert("Event could not be added.  Check the console logs");
			};
        });
        xhr.send(JSON.stringify(eventUpdates));
    }

	render(){
		if (!this.props.guest){
			return (<div> guest loading...</div>);
		}
		//otherwise...
		return (
			<tr className="grey darken-4 bordered">
				<td className="white-text text-blue-grey lighten-5 hoverable">{this.props.guest.name.toUpperCase()}</td>
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
					<a className="waves-effect waves-light btn deep-purple darken-3 hoverable" onClick={this.updateCheckIns}>ENTERED</a>
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
		venue: state.venue
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchEvents, selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Guest);
