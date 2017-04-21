/* this component will be rendered at the top of the NavBar container.  It contains the venue's name and the quick-add button for adding events. */

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class NavBarHeader extends Component {
	constructor(props) {
		super(props); 
	}
	render() {
		// if venue is not in the props, render a placeholder
		if (!this.props.venueName){
			return (
				<div><p>loading venue name...</p></div> 
			)
		}
		// otherwise render the full component...
		return (
			<div className="row" id="nav-bar-header">
				<div className="col s12 m12 l12">
					<div className="row center-align"  id="logo-box">
						<Link to={'/'}>
							<h3>{this.props.venueName}</h3>
						</Link>
					</div>
					<div className="row center-align">
						<Link className="grey darken-1 btn waves-effect white-text waves-light hoverable" to={'/dash/add-event'}>ADD EVENT</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default NavBarHeader;
