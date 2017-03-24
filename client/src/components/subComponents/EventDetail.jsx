import React, { PropTypes, Component } from 'react';

import { connect } from "react-redux";

import Auth from "../../modules/Auth";

import DashboardHeader from "./DashboardHeader.jsx";
import Guest from "./Guest.jsx";
import SearchBar from "./SearchBar.jsx";

import { onChangeSearchTerm } from '../../actions';

class EventDetail extends Component {
	constructor(props){
		// get parent props 
		super(props);
	}

	// render guest helper function 
	renderList(term) {
		if (!term || term === '') { 
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
		} else {
			let filteredGuests = this.props.activeEvent.guests.filter((guestName) => {
				return guestName.name.toLowerCase().indexOf(term.toLowerCase()) !== -1;
			});
			return filteredGuests.map((guest, index) => {
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
	}

	render() {
		// if this.props.book is null, return early
		if (!this.props.activeEvent) {
			return <div> Select an event to get started.</div>;
		}
		// otherwise... 
		const activeEvent = this.props.activeEvent.headliner;  //NOte: dead code?
		return (
			<div className="row">

				<div className="col s12 m12 l12" style={{padding:"20px"}}>

					<DashboardHeader onChangeSearchTerm={this.props.onChangeSearchTerm} />

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
							
							{this.renderList(this.props.searchTerm)}
						</tbody>
					</table>

				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		onChangeSearchTerm(term) {
			return dispatch(onChangeSearchTerm(term));
		}
	}
}

function mapStateToProps(state) {
	// whatever is returned will be mapped to the props of this component
	return {
		activeEvent: state.activeEvent,
		searchTerm: state.activeEvent ? state.activeEvent.searchTerm : null
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetail);