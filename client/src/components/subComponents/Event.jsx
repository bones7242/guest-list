import React, {PropTypes, Component} from 'react';

class EventDetails extends Component {
	render() {
		return (
			<div className="event">
				<h1>TEST: EVENTS FORM HERE </h1>
			</div>
		);
	}
}

EventDetails.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default EventDetails;