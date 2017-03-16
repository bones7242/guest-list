import React, { PropTypes } from 'react';

const DashboardLogo = ({ venueName }) => {
	return (

		<div className="row grey grey darken-3" style={{ borderBottomStyle: "solid", borderColor: "white", borderWidth: "1px" }}>
			<div className="logo-bar" >

				<div className="col s12 m12 l12 valign-wrapper" style={{ textAlign: "center", margin: "auto" }}>
					<h3 className="hoverable center-align">{venueName}</h3>
				</div>
				<div className="col s12 m12 l12 valign-wrapper">
					<a className="waves-effect waves-teal btn-flat center-align" style={{ textAlign: "center", margin: "auto" }}>Button</a>
				</div>
			</div>
		</div>
	);
}

export default DashboardLogo;
