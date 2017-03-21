import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import Auth from "../../modules/Auth";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchEvents, selectEvent } from "../../actions/index";

import DashboardHeader from "./DashboardHeader.jsx";

class AddEventForm extends Component {
	// constructor is called whenever a new instance of the class is created
	constructor(props) {
		// super is calling the parent's method "props" (i think to pass them down)
        super(props); 
		//console.log("props:", props);
		// add default values for optional fields, like 'support's, when setting the initial state
        this.state = {
            newEvent: {
				venue: "loading",
				supportOne: "none",
				supportTwo: "none",
				supportThree: "none",
				date: "04/01/2017",
				time: 2000,
				headlinerAllotment: 0,
				supportOneAllotment: 0,
				supportTwoAllotment: 0,
				supportThreeAllotment: 0,
			}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
		this.processEventForm = this.processEventForm.bind(this);
		this.createNewEvent = this.createNewEvent.bind(this);
    }

	// event handler for input elements.  This takes the input and inserts it into the state using the 'name' of the element that triggered it as the key.
	handleInputChange(event){
		//console.log(event.target.value);
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
				console.log("success! message:", xhr.response.newEvent)
				alert("Event was successfully added :)");
				// update the events in the applicaiton state
				this.props.fetchEvents(this.props.venue._id, Auth.getToken());
				// select the newly created event
				this.props.selectEvent(xhr.response.newEvent);
                // redirect to the dash, and have the dash select the newly created event for display
				this.props.router.replace("/dash/event");

            } else {
				console.log("there was an error in creating the event. error:", xhr.response.message)
				alert("Event could not be added.  Check the console logs :(");
			};
        });
        xhr.send(JSON.stringify(newEvent));
    }

	// render the component 
	render() {
		// check to make sure a venue is in the props.
		if (!this.props.venue){
			return (
				<div>A venue needs to be selected before you can start adding events.</div>
			)
		}
		// if a venue is in the props, show add-event form.
		return (
			<div className=" row col s12 add-event-form" style={{paddingTop:'25px', borderTopStyle:"solid", borderColor: "black", borderWidth: "3px"}}>
				<div className="row grey darken-3">

					<div className="row" style={{paddingTop:"10px"}}>
							<h3 className="center-align">Add A New Event</h3>
					</div>

					<form action="/" onSubmit={this.processEventForm}>

						<div className="row" style={{paddingTop: "20px"}}>
							
							<div className="input-field col s8">
								<label htmlFor="headliner">Headliner*</label>
								<input  name="headliner"  type="text" className="validate" onChange={this.handleInputChange}></input>
								
							</div>
							
							<div className="input-field col s4">
								<input type="datetime-local" name="datetime-local" onChange={this.handleInputChange}></input>
								
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

						<div className="row valign-wrapper" >
							<div className="col s6 right-align" >
								<Link className="waves-effect waves-teal btn-flat center-align" to={'/'}>Cancel</Link>
							</div>

							<div className="col s6 left-align" >
								<button type="submit" className="waves-effect waves-teal btn-flat center-align">Submit</button>				
								{/*<button type="submit" className="waves-effect waves-teal btn-flat center-align" onClick="tabColor()"><Link to={'/'}>Submit</Link></button>						*/}

							</div>
						</div>
						
					</form>

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