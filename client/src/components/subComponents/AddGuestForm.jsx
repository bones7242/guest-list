import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Auth from "../../modules/Auth"; //added by lou

import { connect } from "react-redux";

class AddGuestForm extends Component {
	// constructor is called whenever a new instance of the class is created
	constructor(props) {
		// super is calling the parent's method "props" (i think to pass them down)
        super(props); 
		//console.log("props:", props);
		// add default values for optional fields, like 'support's, when setting the initial state
        this.state = {
            newGuest: {
				venue: "loading",
				name: "none",
				email: "none",
				phone: "none",
				plusOne: "2",
				vip: 1,
				allAccess: 0,
				photoPass: 0,
				pressPass: 0,
				houseList: 0,
				supportOneList: 0,
				supportTwoList: 0,
				supportThreeList: 0
			},
			venueInfo: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
		this.processGuestForm = this.processGuestForm.bind(this);
		this.createNewGuest = this.createNewGuest.bind(this);
    }

	// event handler for input elements.  This takes the input and inserts it into the state using the 'name' of the element that triggered it as the key.
	handleInputChange(event){
		//console.log(event.target.value);
		const field = event.target.name;
        const newGuest = this.state.newGuest;
        newGuest[field] = guest.target.value;
        this.setState({
            newGuest
        });
	}

	// this custom method will trigger when the submit button is clicked.  it will check the inputs for errors and then initiate the create guest method to actually create the guest.
	processGuestForm(event) {
        // Prevent default action.  in this case, action is the form submission event.
        guest.preventDefault();
		// do basic front-end checks to make sure form was filled out correctly
		const newGuest = this.state.newGuest;
		const venueId = this.state.venueInfo._id;
		//create the event
		this.createNewEvent(newGuest, venueId);
        
    }

	// this custom method will create the guest in the database.  if successful, it redirects the user to the dashboard.
    createNewGuest(newEvent, venueId){
        // add the new event to the mongo database 
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/guest");
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
				console.log("success! message:", xhr.response.message)
				alert("Event was successfully added :)");
                // redirect to the dash, and have the dash select the newly created event for display

                	//[ redirect goes here ]

            } else {
				console.log("there was an error in creating the guest. error:", xhr.response.message)
				alert("Guest could not be added.  Check the console logs :(");
			};
        });
        xhr.send(JSON.stringify(newGuest));
    }

	// render the component 
	render() {
		return (
			<div className="row col s12 add-event-form" style={{paddingTop:'15px', borderTopStyle:"solid", borderColor: "black", borderWidth: "3px"}}>
				<div className="row grey darken-3">
				<form className="col s12" action="/" onSubmit={this.processGuestForm}>
					<div className="row" style={{paddingTop:"10px"}}>
							<h3 className="center-align">Add A New Fan To Your List</h3>
					</div>



					<div className="row" style={{paddingTop: "20px"}}>
						
						<div className="input-field col s6">
							<input placeholder="Name" id="AttendeeName"  type="text" className="validate" onChange={this.handleInputChange}></input>
							<label htmlFor="name">Name</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="Affiliation" id="Affiliation"  type="text" className="validate" onChange={this.handleInputChange}></input>
							<label htmlFor="Affiliation">Affiliation</label>
						</div>
						<div className="input-field col s2">
							<input id="email" type="email" className="validate" onChange={this.handleInputChange}></input>
          					<label htmlFor="email">Email</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="PhoneNumber" id="PhoneNumber"  type="text" className="validate" onChange={this.handleInputChange}></input>
							<label htmlFor="PhoneNumber">PhoneNumber</label>
						</div>
					
					</div>

					
					<div className="input-field col s12">
					    <select>
					      <option value="" disabled selected onChange={this.handleInputChange}>Plus One?</option>
					      <option value="1">Option 1</option>
					      <option value="2">Option 2</option>
					      <option value="3">Option 3</option>
					      <option value="4">Option 4</option>
					      <option value="5">Option 5</option>
					      <option value="6">Option 6</option>
					      <option value="7">Option 7</option>
					      <option value="8">Option 8</option>
					    </select>
					    
					 </div>

					<div className="row" style={{paddingTop: "20px"}}>
						
						<div className="input-field col s3">
							<p>
      							<input name="group1" type="radio" id="test1" onChange={this.handleInputChange}/>
      							<label htmlFor="test1">VIP</label>
    						</p>
						</div>
						<div className="input-field col s3">
							<p>
      							<input name="group1" type="radio" id="test1" onChange={this.handleInputChange}/>
      							<label htmlFor="test1">All Access</label>
    						</p>
						</div>
						<div className="input-field col s3">
							<p>
      							<input name="group1" type="radio" id="test1" onChange={this.handleInputChange} />
      							<label htmlFor="test1">Press</label>
    						</p>
    					</div>
						<div className="input-field col s3">
							<p>
      							<input name="group1" type="radio" id="test1" onChange={this.handleInputChange} />
      							<label htmlFor="test1">Photo</label>
    						</p>
						</div>
					
					</div>

					<div className="row" style={{paddingTop: "20px"}}>
						
						<div className="input-field col s2">
							<p>
      							<input name="group1" type="radio" id="test1" onChange={this.handleInputChange}/>
      							<label htmlFor="test1">House List</label>
    						</p>
						</div>
						<div className="input-field col s2">
							<p>
      							<input name="group1" type="radio" id="test1" onChange={this.handleInputChange}/>
      							<label htmlFor="test1">Headliner List</label>
    						</p>
						</div>
						<div className="input-field col s2">
							<p>
      							<input name="group1" type="radio" id="test1" onChange={this.handleInputChange} />
      							<label htmlFor="test1">Support One List</label>
    						</p>
    					</div>
						<div className="input-field col s2">
							<p>
      							<input name="group1" type="radio" id="test1" onChange={this.handleInputChange} />
      							<label htmlFor="test1">Support Two List</label>
    						</p>
						</div>

						<div className="input-field col s2">
							<p>
      							<input name="group1" type="radio" id="test1" onChange={this.handleInputChange} />
      							<label htmlFor="test1">Support Three List</label>
    						</p>
						</div>
					
					</div>

					<div className="row valign-wrapper" style={{paddingTop: "25px"}} >

							<div className="col s6 right-align" >

								<a className="waves-effect waves-teal  cyan lighten-3 btn-flat center-align"><Link to={'/'}>Cancel</Link></a>
							</div>

							<div className="col s6 left-align" >

								<a className="waves-effect waves-teal btn-flat teal lighten-3 center-align"><Link to={'/'}>Submit</Link></a>
						
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
		activeEvent: state.activeEvent
	};
}

export default connect(mapStateToProps)(AddGuestForm);
