import React, { PropTypes, Component } from 'react';
import './NewEvent.css';


class NewEvent extends Component {
	render() {
		return (
			<div className="new-event">
				<p> this is the NewEvent </p>
			</div>
		);
	}
}

NewEvent.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default NewEvent;
