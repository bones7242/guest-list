import React, { PropTypes, Component } from 'react';
import './EventTab.css';


class EventTab extends Component {
	render() {
		return (
			<div className="event-tab">
				<p> this is the EventTab </p>
			</div>
		);
	}
}

EventTab.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default EventTab;
