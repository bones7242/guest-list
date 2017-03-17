import React, { PropTypes, Component } from 'react';
import SearchBar from './SearchBar.jsx';


class DashboardHeader extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<div className="row grey darken-3">
				<div className="col s12 m8 l9 valign-wrapper">
					<h2>Artist Name</h2>
					<h3>Supprt Name(s)</h3>
					<p>Date</p>
					<p>Total People on Guest List: XX</p>
					<p>Total Guests Checked In: XX</p>
				</div>
				<div>
					<SearchBar />
				</div>
			</div>
			
		);
	}
}


export default DashboardHeader;
