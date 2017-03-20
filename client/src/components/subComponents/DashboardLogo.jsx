import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from "react-redux";

class DashboardLogo extends Component {
	render() {
		// if venue is not in the props, render a placeholder
		if (!this.props.venue){
			return (
				<div><p>loading venue name...</p></div>
			)
		}
		// otherwise render the full component
		return (
			
			<div className="row" style={{borderBottomStyle:"solid", borderColor: "white", borderWidth: "1px", padding: "0px", margin: "0px" }}>
			<div className="logo-bar" >
					<div className="col s12 m12 l12 center-align" >
						<Link to={'/'}>
							<h3 className="hoverable center-align">{this.props.venue.name}</h3>
						</Link>
						<Link className="waves-effect waves-green btn-flat deep-purple accent-2 center-align" to={'/dash/add-event'} style={{borderBottomStyle:"solid", borderColor:"#424242", borderWidth:"8px"}} ><i className="medium material-icons right">playlist_add</i>New Event</Link>
					</div>
				</div>
			</div>
		);
	}
}

// whatever is returned will be mapped to the props of this component 
function mapStateToProps(state) {
	return {
		venue: state.venue
	};
}

export default connect(mapStateToProps)(DashboardLogo);
