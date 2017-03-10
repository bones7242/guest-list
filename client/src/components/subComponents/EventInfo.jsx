import React, { PropTypes, Component } from 'react';
//import './EventInfo.css';


class EventInfo extends Component {
	render() {
		return (
			<div className="event-info" className="right">
				<div className="row">
					<div className="col s12 m8 l9" className="valign-wrapper" className="section">
						<h1>Headliner</h1>
						<h3>Support</h3>
						<h3>Support</h3>
						<h3>Support</h3>

						<div className="divider"></div>

					</div>
				</div>
			</div>
		);
	}
}

EventInfo.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default EventInfo;
