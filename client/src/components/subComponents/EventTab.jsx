
//	TAB ON LEFT SIDE BAR FOR EACH EVENT. EACH EVENT WILL HAVE ONE OF THESE.
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

var tabColor =()=> {
	var colours = new Array();
	colours[0] = "black";
	colours[1] = "blue";
	colours[2] = "green";
	colours[3] = "orange";
	colours[4] = "pink";

	var newColor = Math.floor(Math.random()*colours.length);
	document.getElementById("eventStyle").style.backgroundColor=colours[newColor];
}







const EventTab = ({headliner, date, changeEvent}) => {
	
	if (date){
		var newEventDate = new Date(date);
		var eventDate = newEventDate.toDateString();
	}

	return (
		<div className="row tab-event" id="eventStyle" style={{width:"100%", overflow: "auto"}}>

			<div className="col s10">
				<div className="row">

					{ headliner && <Link onClick={changeEvent} to={'/dash/event'}><h5 className="truncate tab-artist" >{headliner.toUpperCase()}</h5></Link> }

				</div>
				<div className="row">
					{ eventDate && <p className="tab-date">{eventDate}</p>}
				</div>
			</div>
			
			<div className="col s2">
				<Link className="btn-floating btn-small tiny waves-effect waves-light deep-purple darken-3 hoverable material-icons right" style={{ margin:"3px"}} onClick={changeEvent} to={'/dash/add-guest'}><i className="medium material-icons">perm_identity</i></Link>
			</div>
		</div>
	);
}

EventTab.propTypes = {
    //headliner: PropTypes.string.isRequired,
    //date: PropTypes.string.isRequired,
	//eventId: PropTypes.string.isRequired,
	//selectEvent: PropTypes.func.isRequired
};

export default EventTab;
