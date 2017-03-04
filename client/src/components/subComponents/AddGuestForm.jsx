import React, { PropTypes, Component } from 'react';
import './AddGuestForm.css';


class AddGuestForm extends Component {
	render() {
		return (
			<div className="add-guest-form">
				<p> this is the AddGuestForm </p>
			</div>
		);
	}
}

AddGuestForm.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default AddGuestForm;
