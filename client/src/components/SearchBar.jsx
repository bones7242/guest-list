/* This component will be rendered in the EventDetail component.  It will control which guests are visible on the guest list (to provide filtering capability). It also has a quick link to add a new guest.  */

import React, { Component } from 'react';
import { Link } from "react-router";

class SearchBar extends Component {
  	constructor(props) {
    	super(props);
  	} 

  	updateSearch(event) {  
    	return this.props.onChangeSearchTerm(event.target.value);
  	}

  	render() {
		return (
			<div className="row search-row valign-wrapper">
				{/* search icon */}
				<div className="col s1 m1 l1 valign">
				<i className="material-icons search-icon center">search</i>
				</div>
				{/* search bar */}
				<div className="col s11 m5 l4 valign">
					<input 
						className="guest-search"
						type="text"
						onChange={this.updateSearch.bind(this)}
						placeholder="Type here to search by guest name..."
					/>
				</div>
				{/* quick link to add a new guest */}
				<div className="col s11 m5 l6 right-align">
					<Link to="dash/add-guest">Add a new guest</Link>
				</div>
				<div className="col s1 m1 l1 right-align">
					<Link to="dash/add-guest" className="grey darken-2 btn-floating btn-small  waves-effect waves-light hoverable">
						<i className="material-icons">playlist_add</i>
					</Link>
				</div>        
			</div>
		);
	}
}

export default SearchBar;

