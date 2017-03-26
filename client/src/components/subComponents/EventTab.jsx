
//	TAB ON LEFT SIDE BAR FOR EACH EVENT. EACH EVENT WILL HAVE ONE OF THESE.
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const EventTab = ({headliner, date, changeEvent}) => {
	
	if (date){
		var newEventDate = new Date(date);
		var eventDate = newEventDate.toDateString();
	}

	return (
		<div className="tab-event">
			<div className="row">
				<div className="col s10">
					<div className="row">
						{ headliner && <Link onClick={changeEvent} to={'/dash/event'}><h5 className="truncate tab-artist" >{headliner.toUpperCase()}</h5></Link> }
					</div>
					<div className="row">
						{ eventDate && <p className="tab-date">{eventDate}</p>}
					</div>
				</div>
				
				<div className="col s2">
					<Link className="btn-floating btn-small waves-effect waves-light deep-purple darken-3 hoverable right-align" onClick={changeEvent} to={'/dash/add-guest'}><i className="material-icons">playlist_add</i></Link>
				</div>
			</div>
		</div>
	);
}

EventTab.propTypes = {
    headliner: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
	changeEvent: PropTypes.func.isRequired
};

export default EventTab;
