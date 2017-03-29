import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';

class NavBarLogo extends Component {

	constructor(props) {
		// super is calling the parent's method "props" (i think to pass them down)
        super(props); 
	}

	render() {
		// if venue is not in the props, render a placeholder
		if (!this.props.venue.name){
			return (
				<div><p>loading venue name...</p></div> 
			)
		}
		// otherwise render the full component
		return (
			<div id="logo-box">
				<div className="row" >
					<div className="col s12 m12 l12 center-align" >
						<Link to={'/'}>
							<h3>{this.props.venue.name}</h3>
						</Link>
						
						<Link className="indigo lighten-1 btn white-text waves-effect waves-light hoverable" to={'/dash/add-event'}>ADD EVENT</Link>
						
					</div>
				</div>
			</div>
		);
	}
}

export default NavBarLogo;
