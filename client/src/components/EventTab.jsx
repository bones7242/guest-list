
//	TAB ON LEFT SIDE BAR FOR EACH EVENT. EACH EVENT WILL HAVE ONE OF THESE.
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const EventTab = ({headliner, date, changeEvent}) => {
	
	if (date){
		var newEventDate = new Date(date);
		var eventDate = newEventDate.toDateString();
	}

	return (
		
		<div className="row tab-event">
			<div className="col s10">
				<div className="row">
					{ headliner && <h5 className="truncate tab-artist card-action" ><Link onClick={changeEvent} to={'/dash/event'}>{headliner.toUpperCase()}</Link></h5> }
				</div>
				<div className="row">
					{ eventDate && <p className="tab-date">{eventDate}</p>}
				</div>
			</div>
			
			<div className="col s2 event-btns">
				<Link className="btn-floating btn-small waves-effect waves-light grey darken-2 hoverable" onClick={changeEvent} to={'/dash/add-guest'}><i className="material-icons">playlist_add</i></Link>
			</div>
		</div>
		
	);
}

EventTab.propTypes = {
	changeEvent: PropTypes.func.isRequired
};

export default EventTab;
