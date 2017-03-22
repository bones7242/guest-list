import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from "react-redux";

class DashboardLogo extends Component {
	render() {

		var setGrey = () => {
              var newColor="#607d8b";
            }

            var setBlue = () => {
              var newColor="#42a5f5"
            }
		// if venue is not in the props, render a placeholder
		if (!this.props.venue){
			return (
				<div><p>loading venue name...</p></div>
			)
		}
		// otherwise render the full component
		return (
			
			<div className="row" style={{borderStyle:"solid", borderColor: "#4527a0", borderWidth: "1px", padding: "0px", margin: "0px" }}>
			<div className="logo-bar" >
					<div className="col s12 m12 l12 center-align" >
						<Link to={'/'}>
							<h3 className="hoverable center-align">{this.props.venue.name}</h3>
						</Link>
						<a className="btn-floating btn-small waves-effect waves-light blue-grey lighten-2 hoverable" style={{margin:"3"}} onclick="setGrey()">G</a>
						<Link className="waves-effect waves-green btn-flat deep-purple darken-3 blue-text text-lighten-5 center-align hoverable" to={'/dash/add-event'} style={{borderBottomStyle:"solid", borderColor:"#424242", borderWidth:"8px", fontColor:"white"}} ><i className="medium material-icons right">playlist_add</i>New Event</Link>
						<a className="btn-floating btn-small waves-effect waves-light blue lighten-2 hoverable" style={{margin:"3"}} onclick="setBlue()">B</a>
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
