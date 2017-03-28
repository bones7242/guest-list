import React, { PropTypes, Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router";

import Auth from "../../modules/Auth";

import DashboardHeader from "./DashboardHeader.jsx";
import Guest from "./Guest.jsx";
import SearchBar from "./SearchBar.jsx"; 
import DefaultSplash from "./DefaultSplash.jsx";

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
		// if no event is selected, return early with a prompt to select an event 
		if (!this.props.activeEvent) {
			return <DefaultSplash message="Select an event to get started" />;
		}
		// if no guests have been added, prompt user to add guests 
		if (this.props.activeEvent.guests.length === 0){
			return (
				<div className="row">
					<div className="col s12 m12 l12">
						{/*event details header*/}
						<DashboardHeader onChangeSearchTerm />
						{/*end of event details header*/}
						{/*prompt to add guests*/}
						{(this.props.activeEvent.guests.length === 0) && <div className="row">
							<div className="col s12 m12 l12">
								<h5 className="grey-text"> 
									<Link to="dash/add-guest" className="indigo lighten-1 btn-floating btn-small  waves-effect waves-light hoverable">
										<i className="material-icons">playlist_add</i>
									</Link>
									<Link className="grey-text"to="dash/add-guest"> This event doesn't have any guests yet.  Add a guest.</Link>
								</h5>
							</div>
						</div>}
						{/*end of prompt to add guests*/}
					</div>
				</div>
			)
		}
		// otherwise render full page... 
		return (
			<div className="row">
				<div className="col s12 m12 l12">
					
					{/*event details header*/}
					<DashboardHeader onChangeSearchTerm />
					{/*end of event details header*/}

					{/*search bar*/}
					<SearchBar onChangeSearchTerm={this.props.onChangeSearchTerm} />
					{/*end of search bar*/}

					{/*guest details*/}
					<div className="row">
						<div className="col s12 m12 l12">
							<table className="guest-table">
								<tbody>
									<tr className="grey-text">
										<th >Name</th>
										<th >Affiliation</th>
										<th >Plus-One</th>
										<th >Access Type</th>
										<th >List</th>
										<th className="center-align">In/Out</th>					
										<th className="right-align">Edit</th>
									</tr>
									
									{this.renderList(this.props.searchTerm)}
								</tbody>
							</table>
						</div>
					</div>
					{/*end of guest details*/}

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