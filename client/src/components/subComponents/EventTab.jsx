
//	TAB ON LEFT SIDE BAR FOR EACH EVENT. EACH EVENT WILL HAVE ONE OF THESE.
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const EventTab = ({headliner, date}) => {
	return (
		<div className="row">
			<div className="hoverable indigo accent-4 col s12 event-tab" style={{padding: "0", width:"100%", borderBottomStyle:"solid", borderColor: "white", borderWidth: "1px"}}>
			
				<div>
					<h5 className="center-align">Headliner: {headliner}</h5>
					<p className="center-align">Date: {date}</p>
					<Link className="btn-floating btn-large waves-effect waves-light red hoverable center-align material-icons" to={'/dash/add-guest'}>+</Link>
				</div>
			</div>
			
		</div>
	);
}

EventTab.propTypes = {
    headliner: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
};

export default EventTab;
