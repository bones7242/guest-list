import React, { PropTypes, Component } from 'react';

const DashboardLogo = ({venueName}) => {
	return (
		
		<div className="row grey grey darken-3" style={{borderBottomStyle:"solid", borderColor: "white", borderWidth: "1px" }}>
		<div className="logo-bar" >
			
				<div className="col s12 m12 l12 valign-wrapper" style={{padding: '0'}}>
					<h3 className="hoverable center-align">{venueName}</h3>
					<a className="waves-effect waves-teal btn-flat center-align">Button</a>
				</div>
			</div>
		</div>
	);
}



export default DashboardLogo;
