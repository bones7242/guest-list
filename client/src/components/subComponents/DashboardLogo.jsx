import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const DashboardLogo = ({venueInfo}) => {
	return (
		
		<div className="row" style={{borderBottomStyle:"solid", borderColor: "white", borderWidth: "1px", padding: "0px", margin: "0px" }}>
		<div className="logo-bar" >
				<div className="col s12 m12 l12 center-align" >
					<Link to={'/'}>
						<h3 className="hoverable center-align">{venueInfo.name}</h3>
					</Link>
					<Link className="waves-effect waves-green btn-flat deep-purple accent-2 center-align" to={'/dash/add-event'} style={{borderBottomStyle:"solid", borderColor:"#424242", borderWidth:"8px"}}><i className="medium material-icons right">playlist_add</i>New Event</Link>
				</div>
			</div>
		</div>
	);
}

DashboardLogo.propTypes = {
    venueInfo: PropTypes.object.isRequired
};

export default DashboardLogo;
