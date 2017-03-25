import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from "react-redux";

class DashboardLogo extends Component {
	render() {

			//round 2 implimentation
		// var setGrey = () => {
  //             var newColor="#607d8b";
  //           }

  //           var setBlue = () => {
  //             var newColor="#42a5f5"
  //           }
		// if venue is not in the props, render a placeholder
		if (!this.props.venue){
			return (
				<div><p>loading venue name...</p></div> 
			)
		}
		// otherwise render the full component
		return (
			
			<div id="logo-box" style={{margin: "20px"}}>
				<div className="row logo-bar" >
					<div className="col s12 m12 l12 center-align" >
						<Link to={'/'}>
							<h3 className="hoverable center-align">{this.props.venue.name}</h3>
						</Link>
						
						<Link className="waves-effect waves-green btn-flat deep-purple darken-3 blue-text text-lighten-5 center-align hoverable" to={'/dash/add-event'} style={{fontColor:"white"}} >+</Link>
						
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
