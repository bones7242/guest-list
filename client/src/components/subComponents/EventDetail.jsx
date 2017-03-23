import React, {PropTypes, Component} from 'react';

import { connect } from "react-redux";

import Auth from "../../modules/Auth";

import DashboardHeader from "./DashboardHeader.jsx";
import Guest from "./Guest.jsx";

class EventDetail extends Component {
	constructor(props){
		// get parent props 
		super(props);
	}

	renderList() {
		return this.props.activeEvent.guests.map((guest, index) => {
			return (
				<Guest 
					key={index} 
					guest={guest}
					headliner={this.props.activeEvent.headliner} 
					supportOne={this.props.activeEvent.supportOne} 
					supportTwo={this.props.activeEvent.supportTwo} 
					supportThree={this.props.activeEvent.supportThree} 
				/>
			)
		})
	}

	render() {
		// if this.props.book is null, return early
		if (!this.props.activeEvent) {
			return <div> Select an event to get started.</div>;
		}
		// otherwise... 
		const activeEvent = this.props.activeEvent.headliner;  //NOte: dead code?
		return (
			<div>
				<div className="row" style={{paddingRight:"0px", paddingLeft:"0px"}}>
					<div className="col s12 m12 l12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
						<DashboardHeader />
					</div>
				</div>

				<div className="row">	
					<div className="col s12 m12 l12" style={{padding: '0'}}> 
						<table>
							<tbody>
								<tr>
									<th className="blue-grey-text text-lighten-1">Name</th>
									<th className="blue-grey-text text-lighten-1">Affiliation</th>
									<th className="blue-grey-text text-lighten-1">Plus-One</th>
									<th className="blue-grey-text text-lighten-1">Access Type</th>
									<th className="blue-grey-text text-lighten-1">List</th>
									<th className="blue-grey-text text-lighten-1">In/Out</th>
								
									<th className="blue-grey-text text-lighten-1">Edit</th>
								</tr>
								
								{this.renderList()}
							</tbody>
						</table>
					</div>

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