import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class AddEventForm extends Component {
	// constructor is called whenever a new instance of the class is created
	constructor(props) {
        super(props); // we are calling the parent's method "props" 

        this.state = {
            newGuest: {}
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

	// event handler for input elements.  This takes the input and inserts it into the state using the 'name' of the element that triggered it as the key.
	handleInputChange(event){
		console.log(event.target.value);

		const field = event.target.name;
        const newGuest = this.state.newGuest;
        newGuest[field] = event.target.value;

        this.setState({
			// add default values for optional fields, like support, when setting the initial state
            newGuest: {
				supportOne: "none",
				supportTwo: "none",
				supportThree: "none"
			}
        });
	}

	// render the component 
	render() {
		return (
			<div className=" row col s12 add-event-form" style={{paddingTop:'25px', borderTopStyle:"solid", borderColor: "black", borderWidth: "3px"}}>
				<div className="row grey darken-3">

					<div className="row" style={{paddingTop:"10px"}}>
							<h3 className="center-align">Add A New Event</h3>
					</div>

					<form >

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
								<Link className="waves-effect waves-teal btn-flat center-align" to={'/'}>Submit</Link>						
							</div>
						</div>
						
					</form>

				</div>
			</div>
		);
	}
}



export default AddEventForm; 