
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
			<div className="hoverable valign-wrapper deep-purple accent-3 col s12 event-tab" style={{padding: "0", width:"100%", borderBottomStyle:"solid", borderColor: "white", borderWidth: "1px", overflow: "scroll"}}>
				<div >
					{ headliner && <Link onClick={selectEvent.bind(eventId, eventIndex)} to={'/dash/event/'+ eventId}><h5 className="center-align truncate">{headliner}</h5></Link> }
					<p className="center-align">{date}</p>
					<Link className="btn-floating btn-small tiny waves-effect waves-light deep-purple accent-2 hoverable venter-align material-icons" style={{borderBottomStyle:"solid", borderColor:"#424242", borderWidth:"5px"}} to={'/dash/add-guest'}><i className="medium material-icons">perm_identity</i></Link>
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
