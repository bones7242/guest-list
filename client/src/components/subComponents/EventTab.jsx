
//	TAB ON LEFT SIDE BAR FOR EACH EVENT. EACH EVENT WILL HAVE ONE OF THESE.
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const EventTab = ({headliner, date, eventId, eventIndex, selectEvent}) => {
	function viewEventClicked(){
		console.log("i've been clicked");
		//selectEvent(eventIndex);

	}

	return (
		<div className="row">
			<div className="hoverable indigo accent-4 col s12 event-tab" style={{padding: "0", width:"100%", borderBottomStyle:"solid", borderColor: "white", borderWidth: "1px"}}>
			
				<div>
					<Link onClick={viewEventClicked} to={'/dash/event/'+ eventId}><h5 className="center-align">Headliner: {headliner}</h5></Link>
					<p className="center-align">Date: {date}</p>
					<Link className="btn-floating btn-large waves-effect waves-light red hoverable center-align material-icons" to={'/dash/add-guest'}>add guest</Link>
				</div>
			</div>
			
		</div>
	);
}

EventTab.propTypes = {
    headliner: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
	eventId: PropTypes.string.isRequired,
	selectEvent: PropTypes.func.isRequired
};

export default EventTab;
