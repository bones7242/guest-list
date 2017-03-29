import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

import Auth from "../../modules/Auth"; //added by lou

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { clearActiveGuest, refreshActiveEvent } from "../../actions/index";

import DashboardHeader from "./DashboardHeader.jsx";
import DefaultSplash from "./DefaultSplash.jsx";

class EditGuestForm extends Component {
	// constructor is called whenever a new instance of the class is created
	constructor(props) {
		// super is calling the parent's method "props" (i think to pass them down)
        super(props); 
		// add default values for optional fields, like 'support's, when setting the initial state
        this.state = {
            updatedGuest: this.props.activeGuest
        };

        this.handleInputChange = this.handleInputChange.bind(this);
		this.processGuestForm = this.processGuestForm.bind(this);
		this.toggleInput = this.toggleInput.bind(this);
		this.updateThisGuest = this.updateThisGuest.bind(this);
    }

	// event handler for input elements.  This takes the input and inserts it into the state using the 'name' of the element that triggered it as the key.
	handleInputChange(event){

		const field = event.target.name;
        const updatedGuest = this.state.updatedGuest;
        updatedGuest[field] = event.target.value;
        this.setState({
            updatedGuest
        });
	}

	toggleInput(event){
		
		const field = event.target.name;
        const updatedGuest = this.state.updatedGuest;

		// toggle the state for the particular field 
		if (updatedGuest[field] === true){
			updatedGuest[field] = false;
		} else if (updatedGuest[field] === false){
			updatedGuest[field] = true;
		}
		
		// reset the state 
        this.setState({
            updatedGuest
        });
	}

	// this custom method will trigger when the submit button is clicked.  it will check the inputs for errors and then initiate the create guest method to actually create the guest.
	processGuestForm(event) {
        // Prevent default action.  in this case, action is the form submission event.
        event.preventDefault();
		// do basic front-end checks to make sure form was filled out correctly
		const updatedGuest = this.state.updatedGuest;
		//create the event
		this.updateThisGuest(updatedGuest);
    }

	// this custom method will create the guest in the database.  if successful, it redirects the user to the dashboard.
    updateThisGuest(guest){
		console.log("updating guest", guest)
        // add the new event to the mongo database 
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", "/api/guest/one");
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
				// clear activeGuest in the application state
				this.props.clearActiveGuest(this.props.activeGuest._id, Auth.getToken());
				// refresh the activeEvent 
				this.props.refreshActiveEvent(this.props.activeEvent._id, Auth.getToken());
                // redirect to the dash, and have the dash display the active event
				this.props.router.replace("/dash/event");

            } else {
				console.log("there was an error in updating the guest. error:", xhr.response.message)
			};
        });
        xhr.send(JSON.stringify(guest));
    }
	componentDidUpdate(prevProps, prevState) {
		// if the activeEvent props were updated, then update the state 
		if (prevProps.activeGuest != this.props.activeGuest){
			this.setState({
				updatedGuest: this.props.activeGuest
			});
		}
	}

	// render the component 
	render() {
		// check to make sure an event is active
		if (!this.state.updatedGuest){
			return (
				<DefaultSplash message="Select a guest to edit." />
			)
		}
		// if the updatedGuest state is ready, render the update form s
		return (
			<div className="row">
				<div className="col s12 m12 l12">

					<DashboardHeader />

					<h3 className="center-align">Edit Guest</h3>

					<form className="col s12 dashboard-form" id="update-guest-form" action="/" onSubmit={this.processGuestForm}>
						
						{/*top row*/}
						<div className="row">					
							<div className=" col s6">
								<label htmlFor="name">Name</label>
								<input id="AttendeeName"  name="name" type="text" value={this.state.updatedGuest.name} onChange={this.handleInputChange}></input>								
							</div>
							<div className=" col s2">
								<label htmlFor="Affiliation">Affiliation</label>
								<input  id="Affiliation" name="affiliation" type="text" value={this.state.updatedGuest.affiliation} onChange={this.handleInputChange}></input>							
							</div>
							<div className=" col s2">
								<label htmlFor="email">Email</label>
								<input id="email" type="email" name="email" value={this.state.updatedGuest.email} onChange={this.handleInputChange}></input>								
							</div>
							<div className=" col s2">
								<label htmlFor="PhoneNumber">PhoneNumber</label>
								<input id="PhoneNumber" name="phone"  type="text" value={this.state.updatedGuest.phone} onChange={this.handleInputChange}></input>							
							</div>
						</div>
						<div className="row">
							<div className="input-field col s4">
								<label htmlFor="plusOne">Plus One(s)</label>
								<input  id="plusOne" name="plusOne"  type="text" value={this.state.updatedGuest.plusOne} onChange={this.handleInputChange}></input>								
							</div>					
							<div className="input-field col s2">
								<input name="vip" type="radio" id="vip" onChange={this.toggleInput} checked={this.state.updatedGuest.vip} />
								<label htmlFor="vip">VIP</label>								
							</div>
							
							<div className="input-field col s2">
								<input name="allAccess" type="radio" id="allAccess" onChange={this.toggleInput} checked={this.state.updatedGuest.allAccess}/>
								<label htmlFor="allAccess">All Access</label>
							</div> 
							<div className="input-field col s2">								
								<input name="pressPass" type="radio" id="pressPass" onChange={this.toggleInput} checked={this.state.updatedGuest.pressPass} />
								<label htmlFor="pressPass">Press</label>							
							</div>
							<div className="input-field col s2">
								<input name="photoPass" type="radio" id="photoPass" onChange={this.toggleInput}  checked={this.state.updatedGuest.photoPass} />
								<label htmlFor="photoPass">Photo</label>
							</div>	

						</div>
						{/*bottom row*/}
						<div className="row">	

							<div className="input-field col s2">								
								<input className="list-radios" name="houseList" type="radio" id="houseList" onChange={this.toggleInput} checked={this.state.updatedGuest.houseList} />
								<label htmlFor="houseList">House List</label>		
							</div>

							{(this.props.activeEvent.headliner != "") && 
							<div className="input-field col s2">
								<input name="headlinerList" type="radio" id="headlinerList" onChange={this.toggleInput} checked={this.state.updatedGuest.headlinerList} />
								<label htmlFor="headlinerList">{this.props.activeEvent.headliner} List</label>	
							</div> }

							{(this.props.activeEvent.supportOne != "") && 
							<div className="input-field col s2">								
								<input name="supportOneList" type="radio" id="supportOneList" onChange={this.toggleInput}  checked={this.state.updatedGuest.supportOneList} />
								<label htmlFor="supportOneList">{this.props.activeEvent.supportOne} List</label>							
							</div> }

							{(this.props.activeEvent.supportTwo != "") && 
							<div className="input-field col s2">							
								<input name="supportTwoList" type="radio" id="supportTwoList" onChange={this.toggleInput}  checked={this.state.updatedGuest.supportTwoList} />
								<label htmlFor="supportTwoList">{this.props.activeEvent.supportTwo} List</label>								
							</div> }

							{(this.props.activeEvent.supportThree != "") && 
							<div className="input-field col s2">								
								<input name="supportThreeList" type="radio" id="supportThreeList" onChange={this.toggleInput}  checked={this.state.updatedGuest.supportThreeList} />
								<label htmlFor="supportThreeList">{this.props.activeEvent.supportThree} List</label>							
							</div> }
						</div>

					</form>		

					{/*buttons */}
					<div className="row">
						<div className="col s6 right-align" >
							<Link  className="grey darken-2 waves-effect waves-teal btn hoverable center" onClick={this.props.clearActiveGuest} to={'/dash/event'}>Cancel</Link>
						</div>
						<div className="col s6 left-align" >
							<button type="submit" form="update-guest-form" className="indigo lighten-1 waves-effect waves-teal btn hoverable center">Submit</button>
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
		activeGuest: state.activeGuest,
		activeEvent: state.activeEvent
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ clearActiveGuest, refreshActiveEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGuestForm);
