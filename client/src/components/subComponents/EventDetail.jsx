import React, {PropTypes, Component} from 'react';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchEvents, selectEvent } from "../../actions/index";

import Auth from "../../modules/Auth";

import DashboardHeader from "./DashboardHeader.jsx";
import Guest from "./Guest.jsx";



class EventDetail extends Component {
	constructor(props){
		super(props);
		if (this.props.activeEvent){
			this.state = {
				totalChecked: this.props.activeEvent.totalChecked
			}
		} else {
			this.state = {
				totalChecked: 0
			}
		}
		
		this.updateTotalChecked = this.updateTotalChecked.bind(this);
		this.updateEvent = this.updateEvent.bind(this);
	}

	updateTotalChecked(enteredIn) {
		const checkedSoFar = this.state.totalChecked
		const entered = parseInt(enteredIn) + checkedSoFar;
		
		this.setState={
			totalChecked: entered
		}
	}

	// this custom method will create the event in the database.  if successful, it redirects the user to the dashboard.
    updateEvent(updatedEvent){
        // add the new event to the mongo database 
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", "/api/event/edit");
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
				console.log("success! message:", xhr.response.updatedEvent)
				alert("Event was successfully updated");
				// update the events in the applicaiton state
				this.props.fetchEvents(this.props.venue._id, Auth.getToken());
				// select the activeEvent in the application state 
				this.props.selectEvent(xhr.response.updatedEvent);
                // redirect to the dash, and have the dash select the newly created event for display
				this.props.router.replace("/dash/event");

            } else {
				console.log("there was an error in creating the event. error:", xhr.response.message)
				alert("Event could not be added.  Check the console logs");
			};
        });
        xhr.send(JSON.stringify(updatedEvent));
    }


	renderList() {
		return this.props.activeEvent.guests.map((guest, index) => {
			return (
				<Guest 
					key={index} 
					guest={guest}
					headliner={this.props.activeEvent.headliner} 
					supportOne={this.props.activeEvent.supportOne} 
					supportTwo={this.props.activeEvent.supportTwo} 
					supportThree={this.props.activeEvent.supportThree} 
					updateTotalChecked={this.updateTotalChecked}
					updateEvent={this.updateEvent}
				/>
			)
		})
	}

	render() {
		// if this.props.book is null, return early
		if (!this.props.activeEvent) {
			return <div> Select an event to get started.</div>;
		}
		// otherwise... 
		const activeEvent = this.props.activeEvent.headliner;
		return (
			<div>
				<div className="row" style={{paddingRight:"0px", paddingLeft:"0px"}}>
					<div className="col s12 m12 l12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
						<DashboardHeader />
					</div>
				</div>

				<div className="row">	
					<div className="col s12 m12 l12" style={{padding: '0'}}> 
						<table>
							<tbody>
								<tr>
									<th className="blue-grey-text text-lighten-1">Name</th>
									<th className="blue-grey-text text-lighten-1">Email</th>
									<th className="blue-grey-text text-lighten-1">Affiliation</th>
									<th className="blue-grey-text text-lighten-1">Phone</th>
									<th className="blue-grey-text text-lighten-1">Plus-One</th>
									<th className="blue-grey-text text-lighten-1">Access Type</th>
									<th className="blue-grey-text text-lighten-1">List</th>
									<th className="blue-grey-text text-lighten-1">In/Out</th>
								
									<th className="blue-grey-text text-lighten-1">Edit</th>
								</tr>
								
								{this.renderList()}
							</tbody>
						</table>
					</div>

				</div>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);