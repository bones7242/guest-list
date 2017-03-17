import React, { PropTypes, Component } from 'react';


const DashboardHeader = ({artist, support}) => {
	return (
		<div className="row grey darken-3">
			
			
				<div className="col s12 m8 l9 valign-wrapper"   >
				<h2>{artist.name}</h2>
				<h3>{support.name}(s)</h3>
				<p>Date</p>
				<p>Total People on Guest List: XX</p>
				<p>Total Guests Checked In: XX</p>
				</div>
			
		</div>
	);
}

export default DashboardHeader;
