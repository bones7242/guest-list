import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class AddEventForm extends Component {
	render() {
		return (
			<div className="add-event-form">
				<div className="row indigo darken-1">
				<form className="col s12">
					<div className="row">
						
						<div className="input-field col s6">
							<input placeholder="Headliner" id="Headliner"  type="text" className="validate"></input>
							<label htmlFor="Headliner">Headliner</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="supportOne" id="supportOne"  type="text" className="validate"></input>
							<label htmlFor="supportOne">First Support</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="supportTwo" id="supportTwo"  type="text" className="validate"></input>
							<label htmlFor="supportTwo">First Support</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="supportThree" id="supportThree"  type="text" className="validate"></input>
							<label htmlFor="supportThree">First Support</label>
						</div>
					
					</div>

					<div className="row">
						<div className="input-field col s12">
          					<input disabled value="I am not editable" id="disabled" type="text" className="validate"></input>
          					<label htmlFor="disabled">Disabled</label>
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
							<label htmlFor="Headliner">Headliner</label>
						</div>
						<div className="input-field col s3">
							<input placeholder="First Support Allotment" id="supportOneAllot"  type="text" className="validate"></input>
							<label htmlFor="supportOne">First Support</label>
						</div>
						<div className="input-field col s3">
							<input placeholder="Second Support Allotment" id="supportTwoAllot"  type="text" className="validate"></input>
							<label htmlFor="supportTwo">First Support</label>
						</div>
						<div className="input-field col s3">
							<input placeholder="Third Support Allotment" id="supportThreeAllot"  type="text" className="validate"></input>
							<label htmlFor="supportThree">First Support</label>
						</div>

						<div className="col s12">

						<Link className="waves-effect waves-teal btn-flat center-align" to={'/'}>Button</Link>

						</div>
					
					</div>



				
				</form>
			</div>
			</div>
		);
	}
}



export default AddEventForm; 