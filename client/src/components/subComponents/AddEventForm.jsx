import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class AddEventForm extends Component {
	render() {
		return (
		 
			<div className=" row col s12 add-event-form" style={{paddingTop:'15px'}}>
				<div className="row grey darken-3">
				<form >
					<div className="row">
						
						<div className="input-field col s6">
							<input placeholder="Headliner" id="Headliner"  type="text" className="validate"></input>
							<label htmlor="Headliner">Headliner</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="First Support" id="supportOne"  type="text" className="validate"></input>
							<label htmlFor="supportOne">First Support</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="Second Support" id="supportTwo"  type="text" className="validate"></input>
							<label htmlFor="supportTwo">Second Support</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="Third Support" id="supportThree"  type="text" className="validate"></input>
							<label htmlFor="supportThree">Third Support</label>
						</div>
					
					</div>

					
					<div className="row">
						<div className="input-field col s3">
							<input type="datetime-local" name="Event:"></input>
          					<label htmlFor="Date">Event Date:</label>
        				</div>

					</div>

					<div className="row">
						
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

						<div className="col s12">

						<a className="waves-effect waves-teal btn-flat center-align"><Link to={'/'}>Button</Link></a>
						<a className="waves-effect waves-teal btn-flat center-align"><Link to={'/'}>Cancel</Link></a>

						</div>
					
					</div>



				
				</form>
			</div>
			</div>
		

		);
	}
}



export default AddEventForm; 