import React, {PropTypes, Component} from 'react';

import { connect } from "react-redux";

import DashboardHeader from "./DashboardHeader.jsx";
import Guest from "./Guest.jsx"

class EventDetail extends Component {
	constructor(props){
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
		const activeEvent = this.props.activeEvent.headliner;
		return (
			<div>
				<div className="row">
					<div className="col s12 m12 l12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
						<DashboardHeader />
					</div>
				</div>

				<div className="row">	
					<div className="col s12 m12 l12" style={{padding: '0'}}> 
						<table>
							<tbody>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Affiliation</th>
									<th>Phone</th>
									<th>Plus-One's</th>
									<th>Access Type</th>
									<th>List</th>
									<th>In/Out</th>
								
									<th>Edit</th>
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