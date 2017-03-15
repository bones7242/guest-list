import React, { PropTypes, Component } from 'react';


class AddGuestForm extends Component {
	render() {
		return (
			<div className="add-guest-form">
				<h1>TEST: ADD GUEST FORM HERE </h1>
			</div>
		);
	}
}

AddGuestForm.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default AddGuestForm;
