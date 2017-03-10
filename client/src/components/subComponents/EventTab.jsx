
//	TAB ON LEFT SIDE BAR FOR EACH EVENT. EACH EVENT WILL HAVE ONE OF THESE.
import React, { PropTypes, Component } from 'react';
import './EventTab.css';


class EventTab extends Component {
	render() {
		return (
			<div className="event-tab hoverable">
				
				<div className="row">
					<div className="col s3" >
						
						<h5 className="center-align"> EVENTNAME DB</h5>
						<p className="center-align">eventdate DB</p>

						<a className="btn-floating btn-large waves-effect waves-light red hoverable" className="center-align"><i className="material-icons">add</i></a>
					</div>
				</div>
				
			</div>
		);
	}
}

EventTab.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default EventTab;
