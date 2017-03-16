import React, { PropTypes, Component } from 'react';

class AddEventForm extends Component {
	render() {
		return (
			<div className="add-event-form">
				<h1>TEST: ADD EVENT FORM HERE </h1>
			</div>
		);
	}
}

AddEventForm.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default AddEventForm; 