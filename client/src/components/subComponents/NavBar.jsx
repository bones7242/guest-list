//EVENTTAB'S GO IN HERE BELOW THE LOGO

import React, { PropTypes, Component } from 'react';
import EventTab from "./EventTab.jsx";

import { connect } from "react-redux";
import { selectEvent } from "../../actions/index";
import { bindActionCreators } from "redux";


class NavBar extends Component {
	constructor(props){
		super(props);
	}

	renderList() {
		return this.props.events.map((event, index) => {
			return (
				<EventTab 
					key={index} 
					headliner={event.headliner} 
					changeEvent={() => this.props.selectEvent(event)}
					//date={event.date} 
					//eventId={event._id}
					//eventIndex={index}
					//selectEvent={this.props.selectEvent}
				/>
			)
		})
	}
	
	render() {
		return (			
			<div className="row event-tab-row" style={{paddingRight:"0px", paddingTop:"0px", marginRight:"0px", marginTop:"0px", borderRightStyle:"solid", borderColor:"white", borderWidth:"3px"}}>
			<div className="nav-bar grey darken-3" >
				
					<div className="col s12 m12 l12" style={{padding: '0'}}> 
						
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
