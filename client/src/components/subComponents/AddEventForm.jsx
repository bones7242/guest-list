import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import Auth from "../../modules/Auth";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchEvents, selectEvent } from "../../actions/index";

import DashboardHeader from "./DashboardHeader.jsx";
import DefaultSplash from "./DefaultSplash.jsx";

class AddEventForm extends Component {
	// constructor is called whenever a new instance of the class is created
	constructor(props) {
		// super is calling the parent's method "props" (i think to pass them down)
        super(props); 
		
		// add default values for optional fields, like 'support's, when setting the initial state
        this.state = {
            newEvent: {
				venue: "",
				headliner: "",
				supportOne: "",
				supportTwo: "",
				supportThree: "",
				date: "",
				time: 0,
				headlinerAllotment: 0,
				supportOneAllotment: 0,
				supportTwoAllotment: 0,
				supportThreeAllotment: 0,
				totalGuest:0,
				totalChecked:0
			}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
		this.processEventForm = this.processEventForm.bind(this);
		this.createNewEvent = this.createNewEvent.bind(this);
    }

	// event handler for input elements.  This takes the input and inserts it into the state using the 'name' of the element that triggered it as the key.
	handleInputChange(event){
		
		const field = event.target.name;
        const newEvent = this.state.newEvent;
        newEvent[field] = event.target.value;
        this.setState({
            newEvent
        });
	}

	// this custom method will trigger when the submit button is clicked.  it will check the inputs for errors and then initiate the create event method to actually create the event.
	processEventForm(event) {
        // Prevent default action.  in this case, action is the form submission event.
        event.preventDefault();
		// do basic front-end checks to make sure form was filled out correctly
		const newEvent = this.state.newEvent;
		newEvent.venue = this.props.venue._id;
		//create the event
		this.createNewEvent(newEvent);
        
    }

	// this custom method will create the event in the database.  if successful, it redirects the user to the dashboard.
    createNewEvent(newEvent){
        // add the new event to the mongo database 
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/event");
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
				// update the events in the applicaiton state
				this.props.fetchEvents(this.props.venue._id, Auth.getToken());
				// select the activeEvent in the application state 
				this.props.selectEvent(xhr.response.newEvent);
                // redirect to the dash, and have the dash select the newly created event for display
				this.props.router.replace("/dash/event");

            } else {				
				console.log("Event could not be added.  Check the console logs");
			};
        });
        xhr.send(JSON.stringify(newEvent));
    }

	// render the component 
	render() {
		// check to make sure a venue is in the props.
		if (!this.props.venue){
			return (
				<DefaultSplash message="A venue must be selected before you can start adding events" />
			)
		}
		// if a venue is in the props, show add-event form.
		return (
			<div className="row"> 
				<div className=" col s12 m12 l12 add-event-form">

					<h3 className="center-align">Add A New Event</h3>
					

					<form action="/" className="grey darken-2" id="new-event-form" onSubmit={this.processEventForm}>

						<div className="row" style={{paddingTop: "20px"}}>
							<div className="input-field col s8">
								<label htmlFor="headliner">Headliner*</label>
								<input  name="headliner"  type="text" className="validate" onChange={this.handleInputChange}></input>							
							</div>						
							<div className="input-field col s4">
								<input type="datetime-local" name="date" onChange={this.handleInputChange}></input>							
							</div>					
						</div>
						
						<div className="row" style={{paddingTop: "20px"}}>						
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
								<input name="supportThree"  type="text" className="validate" onChange={this.handleInputChange}></input>
							</div>
						</div>

						<div className="row" style={{paddingTop: "20px"}}>						
							<div className="input-field col s3">
								<label htmlFor="headlinerAllotment">Headliner Allotment</label>
								<input name="headlinerAllotment"  type="text" className="validate" onChange={this.handleInputChange}></input>
							</div>
							<div className="input-field col s3">
								<label htmlFor="supportOneAllotment">First Support Allotment</label>
								<input name="supportOneAllotment"  type="text" className="validate" onChange={this.handleInputChange}></input>
							</div>
							<div className="input-field col s3">
								<label htmlFor="supportTwoAllotment">Second Support Allotment</label>								
								<input name="supportTwoAllotment"  type="text" className="validate" onChange={this.handleInputChange}></input>
							</div>
							<div className="input-field col s3">
								<label htmlFor="supportThreeAllotment">Third Support Allotment</label>
								<input name="supportThreeAllotment"  type="text" className="validate" onChange={this.handleInputChange}></input>
							</div>
						</div>
						
					</form>
					
					{/*buttons*/}
					<div className="row">
						<div className="col s6 right-align" >
							<Link className="waves-effect waves-teal indigo lighten-1 btn-flat center" to={'/'}>Cancel</Link>
						</div>

						<div className="col s6 left-align" >
							<button type="submit" className="waves-effect waves-teal blue lighten-1 btn-flat center" form="newEventForm">Submit</button>				

						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	// whatever is returned will be mapped to the props of this component
	return {
		venue: state.venue
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ fetchEvents, selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEventForm); 