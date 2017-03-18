import React, { PropTypes, Component } from 'react';
//import './Content.css';


class DashboardHeader extends Component {
	render() {
		return (
			<div className="row grey darken-3">
				
				
					<div className="col s12 m12 l12 valign-wrapper"   >
					<h3>Artist </h3>
					<h4>Supprt Name(s)</h4>
					<p>Date</p>
					<p>Total People on Guest List: XX</p>
					<p>Total Guests Checked In: XX</p>
					</div>
				
			</div>
		);
	}
}


export default DashboardHeader;
