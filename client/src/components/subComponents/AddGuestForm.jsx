import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import Auth from "../../modules/Auth"; //added by lou

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { refreshActiveEvent, fetchEvents } from "../../actions/index";

import DashboardHeader from "./DashboardHeader.jsx";

class AddGuestForm extends Component {
	// constructor is called whenever a new instance of the class is created
	constructor(props) {
		// super is calling the parent's method "props" (i think to pass them down)
        super(props); 
		//console.log("props:", props);
		// add default values for optional fields, like 'support's, when setting the initial state
        this.state = {
            newGuest: {
				eventId: "loading",
				name: "none",
				email: "none",
				affiliation: "none",
				phone: "none",
				plusOne: 0,
				vip: false,
				allAccess: false,
				photoPass: false,
				pressPass: false,
				houseList: false,
				headlinerList: false,
				supportOneList: false,
				supportTwoList: false,
				supportThreeList: false
			}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
		this.processGuestForm = this.processGuestForm.bind(this);
		this.toggleInput = this.toggleInput.bind(this);
		this.createNewGuest = this.createNewGuest.bind(this);
    }

	// event handler for input elements.  This takes the input and inserts it into the state using the 'name' of the element that triggered it as the key.
	handleInputChange(event){
		//console.log("event value", event.target.value);
		//console.log("event name", event.target.name);
		//console.log("event id", event.target.id);
		const field = event.target.name;
        const newGuest = this.state.newGuest;
        newGuest[field] = event.target.value;
        this.setState({
            newGuest
        });
	}

	toggleInput(event){
		
		//console.log("event name", event.target.name);
		//console.log("event id", event.target.id);
		
		const field = event.target.name;
        const newGuest = this.state.newGuest;

		//console.log("value", newGuest[field]);
		// toggle the state for the particular field 
		if (newGuest[field] === true){
			newGuest[field] = false;
		} else if (newGuest[field] === false){
			newGuest[field] = true;
		}
		console.log("value", newGuest[field]);
		// reset the state 
        this.setState({
            newGuest
        });
	}

	// this custom method will trigger when the submit button is clicked.  it will check the inputs for errors and then initiate the create guest method to actually create the guest.
	processGuestForm(event) {
        // Prevent default action.  in this case, action is the form submission event.
        event.preventDefault();
		// do basic front-end checks to make sure form was filled out correctly
		const newGuest = this.state.newGuest;
		newGuest.eventId = this.props.activeEvent._id;
		//create the event
		this.createNewGuest(newGuest);
        
    }

	// this custom method will create the guest in the database.  if successful, it redirects the user to the dashboard.
    createNewGuest(newGuest){
        // add the new event to the mongo database 
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/guest");
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
				console.log("success! message:", xhr.response.message)
				alert("Guest was successfully added :)");
				// update the "active event"" in the application state
				this.props.refreshActiveEvent(this.props.activeEvent._id, Auth.getToken());
				// update the specific event in the "events"array in the applicaiton state  
				this.props.fetchEvents(this.props.venue._id, Auth.getToken());
                // redirect to the dash, and have the dash select the newly created event for display
				this.props.router.replace("/dash/event");

            } else {
				console.log("there was an error in creating the guest. error:", xhr.response.message)
				alert("Guest could not be added.  Check the console logs :(");
			};
        });
        xhr.send(JSON.stringify(newGuest));
    }

	// render the component 
	render() {
		// check to make sure an event is active
		if (!this.props.activeEvent){
			return (
				<div>Select an event to start adding guests.</div>
			)
		}
		// if an event is active, show add guest form 
		return (
			<div>
				<div className="row">
					<div className="col s12 m12 l12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
						<DashboardHeader />
					</div>
				</div>
				<div className="row col s12 add-event-form" style={{paddingTop:'15px', borderTopStyle:"solid", borderColor: "#4527a0", borderWidth: "3px"}}>
					<div className="row grey darken-3">
					<form className="col s12" action="/" onSubmit={this.processGuestForm}>
						<div className="row" style={{paddingTop:"10px"}}>
								<h3 className="center-align">Add A New Fan To Your List</h3>
						</div>



						<div className="row" style={{paddingTop: "20px"}}>
							
							<div className="input-field col s6">
								
								<input placeholder="Name" id="AttendeeName"  name="name" type="text" className="validate" onChange={this.handleInputChange}></input>
								<label htmlFor="name">Name</label>
								
							</div>
							<div className="input-field col s2">
								<input placeholder="Affiliation" id="Affiliation" name="affiliation" type="text" className="validate" onChange={this.handleInputChange}></input>
								<label htmlFor="Affiliation">Affiliation</label>
							</div>
							<div className="input-field col s2">
								<input id="email" type="email" name="email" className="validate" onChange={this.handleInputChange}></input>
								<label htmlFor="email">Email</label>
							</div>
							<div className="input-field col s2">
								<input placeholder="PhoneNumber" id="PhoneNumber" name="phone"  type="text" className="validate" onChange={this.handleInputChange}></input>
								<label htmlFor="PhoneNumber">PhoneNumber</label>
							</div>
						
						</div>

						<div className="row">
							<div className="input-field col s12">
								<input placeholder="0" id="plusOne" name="plusOne"  type="text" className="validate" onChange={this.handleInputChange}></input>
								<label htmlFor="plusOne">Plus One</label>
							</div>
						</div>

						<div className="row" style={{paddingTop: "20px"}}>
							
							<div className="input-field col s3">

								<p>
									<input name="vip" type="radio" id="vip" onChange={this.toggleInput} checked={this.state.newGuest.vip} />
									<label htmlFor="vip">VIP</label>
								</p>
							</div>
							<div className="input-field col s3">
								<p>
									<input name="allAccess" type="radio" id="allAccess" onChange={this.toggleInput} checked={this.state.newGuest.allAccess}/>
									<label htmlFor="allAccess">All Access</label>
								</p>
							</div>
							<div className="input-field col s3">
								<p>
									<input name="pressPass" type="radio" id="pressPass" onChange={this.toggleInput} checked={this.state.newGuest.pressPass} />
									<label htmlFor="pressPass">Press</label>
								</p>
							</div>
							<div className="input-field col s3">
								<p>
									<input name="photoPass" type="radio" id="photoPass" onChange={this.toggleInput}  checked={this.state.newGuest.photoPass} />
									<label htmlFor="photoPass">Photo</label>
								</p>
							</div>
						
						</div>

						<div className="row" style={{paddingTop: "20px"}}>
							
							<div className="input-field col s2">
								<p>
									<input name="houseList" type="radio" id="houseList" onChange={this.toggleInput} checked={this.state.newGuest.houseList} />
									<label htmlFor="houseList">House List</label>
								</p>
							</div>
							<div className="input-field col s2">
								<p>
									<input name="headlinerList" type="radio" id="headlinerList" onChange={this.toggleInput} checked={this.state.newGuest.headlinerList} />
									<label htmlFor="headlinerList">Headliner List</label>
								</p>
							</div>
							<div className="input-field col s2">
								<p>
									<input name="supportOneList" type="radio" id="supportOneList" onChange={this.toggleInput}  checked={this.state.newGuest.supportOneList} />
									<label htmlFor="supportOneList">Support One List</label>
								</p>
							</div>
							<div className="input-field col s2">
								<p>
									<input name="supportTwoList" type="radio" id="supportTwoList" onChange={this.toggleInput}  checked={this.state.newGuest.supportTwoList} />
									<label htmlFor="supportTwoList">Support Two List</label>
								</p>
							</div>

							<div className="input-field col s2">
								<p>
									<input name="supportThreeList" type="radio" id="supportThreeList" onChange={this.toggleInput}  checked={this.state.newGuest.supportThreeList} />
									<label htmlFor="supportThreeList">Support Three List</label>
								</p>
							</div>
						
						</div>

						<div className="row valign-wrapper" style={{paddingTop: "25px"}} >

								<div className="col s6 right-align" >

									<Link  className="waves-effect waves-teal  indigo lighten-1 btn-flat center-align" to={'/'}>Cancel</Link>
								</div>

								<div className="col s6 left-align" >
									<button type="submit" className="waves-effect waves-teal btn-flat blue lighten-1 center-align">Submit</button>
								</div>
						</div>
					
					</form>
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
		venue: state.venue  //note: only really need the venue id 
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ refreshActiveEvent, fetchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGuestForm);
