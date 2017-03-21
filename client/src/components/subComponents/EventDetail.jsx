import React, {PropTypes, Component} from 'react';

import { connect } from "react-redux";

import DashboardHeader from "./DashboardHeader.jsx";

class EventDetail extends Component {
	

	render() {
		// if this.props.book is null, return early
		if (!this.props.activeEvent) {
			return <div> Select an event to get started.</div>;
		}
		// otherwise... 
		const activeEvent = this.props.activeEvent.headliner;
		return (
			<div>
				<div className="row">
					<div className="col s12 m12 l12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
						<DashboardHeader />
					</div>
				</div>
				<div className="event">
					<h1>TEST: EVENT DETAIL BELOW </h1>
					<p>{this.props.activeEvent.headliner}</p>
					<p>test</p>

				</div>
			</div>
		);
	}
}


function mapStateToProps(state) {
	// whatever is returned will be mapped to the props of this component
	return {
		activeEvent: state.activeEvent
	};
}

export default connect(mapStateToProps)(EventDetail);