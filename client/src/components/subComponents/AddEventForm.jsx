import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class AddEventForm extends Component {
	render() {
		return (
		 
			<div className=" row col s12 add-event-form" style={{paddingTop:'25px', borderTopStyle:"solid", borderColor: "black", borderWidth: "3px"}}>
				<div className="row grey darken-3">
				<form >
					
					<div className="row" style={{paddingTop:"10px"}}>
							<h3 className="center-align">Add A New Event</h3>
					</div>

					<div className="row" style={{paddingTop: "20px"}}>
						
						<div className="input-field col s8">
							<input placeholder="Headliner" id="Headliner"  type="text" className="validate"></input>
							<label htmlFor="Headliner">Headliner*</label>
						</div>
						
						<div className="input-field col s4">
							<input type="datetime-local" name="datetime-local"></input>
          					
        				</div>
					
					</div>

					
					<div className="row" style={{paddingTop: "20px"}}>
						

        				<div className="input-field col s4">
							<input placeholder="First Support" id="supportOne"  type="text" className="validate"></input>
							<label htmlFor="supportOne">First Support</label>
						</div>
						<div className="input-field col s4">
							<input placeholder="Second Support" id="supportTwo"  type="text" className="validate"></input>
							<label htmlFor="supportTwo">Second Support</label>
						</div>
						<div className="input-field col s4">
							<input placeholder="Third Support" id="supportThree"  type="text" className="validate"></input>
							<label htmlFor="supportThree">Third Support</label>
						</div>

					</div>

					<div className="row" style={{paddingTop: "20px"}}>
						
						<div className="input-field col s3">
							<input placeholder="Headliner Allotment" id="HeadlinerAllot"  type="text" className="validate"></input>
							<label htmlFor="Headliner">Headliner Allotment</label>
						</div>
						<div className="input-field col s3">
							<input placeholder="First Support Allotment" id="supportOneAllot"  type="text" className="validate"></input>
							<label htmlFor="supportOne">First Support Allotment</label>
						</div>
						<div className="input-field col s3">
							<input placeholder="Second Support Allotment" id="supportTwoAllot"  type="text" className="validate"></input>
							<label htmlFor="supportTwo">Second Support Allotment</label>
						</div>
						<div className="input-field col s3">
							<input placeholder="Third Support Allotment" id="supportThreeAllot"  type="text" className="validate"></input>
							<label htmlFor="supportThree">Third Support Allotment</label>
						</div>

						
					
					</div>

					<div className="row valign-wrapper" >

							<div className="col s6 right-align" >

								<a className="waves-effect waves-teal btn-flat center-align"><Link to={'/'}>Cancel</Link></a>
							</div>

							<div className="col s6 left-align" >

								<a className="waves-effect waves-teal btn-flat center-align"><Link to={'/'}>Submit</Link></a>
						
							</div>
					</div>



				
				</form>
			</div>
			</div>
		

		);
	}
}



export default AddEventForm; 