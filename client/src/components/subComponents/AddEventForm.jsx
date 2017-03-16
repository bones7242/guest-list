import React, { PropTypes, Component } from 'react';

class AddEventForm extends Component {
	render() {
		return (
			<div className="add-event-form">
				<div className="row indigo darken-1">
				<form className="col s12">
					<div className="row">
						
						<div className="input-field col s6">
							<input placeholder="Headliner" id="Headliner"  type="text" className="validate"></input>
							<label for="Headliner">Headliner</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="supportOne" id="supportOne"  type="text" className="validate"></input>
							<label for="supportOne">First Support</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="supportTwo" id="supportTwo"  type="text" className="validate"></input>
							<label for="supportTwo">First Support</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="supportThree" id="supportThree"  type="text" className="validate"></input>
							<label for="supportThree">First Support</label>
						</div>
					
					</div>

					<div className="row">
						<div className="input-field col s12">
          					<input disabled value="I am not editable" id="disabled" type="text" className="validate"></input>
          					<label for="disabled">Disabled</label>
        				</div>

					</div>
					<div className="row">
						<div className="input-field col s3">
							<input type="datetime-local" name="Event:"></input>
          					<label for="Date">Event Date:</label>
        				</div>

					</div>

					<div className="row">
						
						<div className="input-field col s3">
							<input placeholder="Headliner Allotment" id="HeadlinerAllot"  type="text" className="validate"></input>
							<label for="Headliner">Headliner</label>
						</div>
						<div className="input-field col s3">
							<input placeholder="First Support Allotment" id="supportOneAllot"  type="text" className="validate"></input>
							<label for="supportOne">First Support</label>
						</div>
						<div className="input-field col s3">
							<input placeholder="Second Support Allotment" id="supportTwoAllot"  type="text" className="validate"></input>
							<label for="supportTwo">First Support</label>
						</div>
						<div className="input-field col s3">
							<input placeholder="Third Support Allotment" id="supportThreeAllot"  type="text" className="validate"></input>
							<label for="supportThree">First Support</label>
						</div>
					
					</div>



				
				</form>
			</div>
			</div>
		);
	}
}

AddEventForm.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default AddEventForm; 