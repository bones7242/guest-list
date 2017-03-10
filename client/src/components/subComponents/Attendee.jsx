import React, { PropTypes, Component } from 'react';
import './Attendee.css';


class EventTab extends Component {
	render() {
		return (
			<div className="event-tab hoverable">
				
				<div className="row">
					<div className="col s12 m8 l9" >
						
						<li class="collection-item">Alvin</li>
						

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

export default Attendee;
