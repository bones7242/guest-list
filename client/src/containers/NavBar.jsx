//EVENTTAB'S GO IN HERE BELOW THE LOGO

import React, { PropTypes, Component } from 'react';

import { connect } from "react-redux";
import { selectEvent } from "../actions/index";
import { bindActionCreators } from "redux";

import NavBarHeader from "../components/NavBarHeader.jsx";
import EventTab from "../components/EventTab.jsx";

class NavBar extends Component {
	constructor(props){
		super(props);
	}

	renderList() {
		return this.props.events.map((event, index) => {
			return (
				<div key={index} className="hover">
					<EventTab 
						key={"tab" + index} 
						headliner={event.headliner} 
						date={event.date} 
						changeEvent={() => this.props.selectEvent(event)}
					/>
				</div>
			)
		})
	}
	
	render() {
		// if events has not populated, render a placeholder 
		if (!this.props.events){
			return (
				<div><p>Create events to get started.</p> </div>
			)
		}
		// otherwise, render the page 
		return (			
			<div className="row event-tab-row" style={{paddingRight:"0px", paddingTop:"0px", marginRight:"0px", marginTop:"0px"}}>

				<div className="nav-bar">
				
					<div className="col s12 m12 l12 nav-bar-inner" style={{padding: '0'}}> 

						<NavBarHeader venueName={this.props.venue.name}/>

						{/*render an event tab for each event*/}
						{this.renderList()}

					</div>
				</div>

			</div>
		); 
	}
}

NavBar.propTypes = {
	//events: PropTypes.array.isRequired,
	//selectEvent: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    // whatever gets returned from this method will show up as props inside of this component
    // this function is the glue between react and redux.
    return {
		venue: state.venue,
        events: state.events  
    };
}

// anything returned from this function will end up as props on the NavBar container 
function mapDispatchToProps(dispatch) {
	// whenever selectEvent is called, the result should be passed to all reducers (by flowing through the dispatch function).
	return bindActionCreators({ selectEvent: selectEvent }, dispatch)
}

// promote NavBar from a component to a container - it needs to know about this dispatch method, selectEvent.  Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
