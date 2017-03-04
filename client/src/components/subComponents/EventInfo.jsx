import React, { PropTypes, Component } from 'react';
import './EventInfo.css';


class EventInfo extends Component {
	render() {
		return (
			<div className="event-info">
				<p> this is the EventInfo </p>
			</div>
		);
	}
}

EventInfo.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default EventInfo;
