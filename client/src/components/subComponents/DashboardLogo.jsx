import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DashboardLogo = ({venueInfo}) => {
	return (
		
		<div className="row grey grey darken-3" style={{borderBottomStyle:"solid", borderColor: "white", borderWidth: "1px" }}>
		<div className="logo-bar" >
				<div className="col s12 m12 l12 center-align" style={{padding: '0'}}>
					<Link to={'/'}>
						<h3 className="hoverable center-align">{venueInfo.name}</h3>
					</Link>
					<Link className="waves-effect waves-teal btn-flat center-align" to={'/dash/add-event'}>Add New Event</Link>
				</div>
			</div>
		</div>
	);
}

DashboardLogo.propTypes = {
    venueInfo: PropTypes.object.isRequired
};

export default DashboardLogo;
