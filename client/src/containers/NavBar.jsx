/* This container will render inside the dashboard page.
It will hold the left side navigation components. */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { selectEvent } from '../actions/index';
import { bindActionCreators } from 'redux';
import NavBarHeader from '../components/NavBarHeader.jsx';
import EventTab from '../components/EventTab.jsx';

class NavBar extends Component {
  constructor(props){
    super(props);
  }
  renderList() {
    return this.props.events.map((event, index) => {
      return (
        <div key={index} className="hover">
          <EventTab 
            key={'tab' + index} 
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
      <div className="row event-tab-row" style={{paddingRight:'0px', paddingTop:'0px', marginRight:'0px', marginTop:'0px'}}>
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
  venue: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    venue: state.venue,
    events: state.events,
  };
}

function mapDispatchToProps(dispatch) {
  // whenever selectEvent is called, the result should be passed to all reducers
  return bindActionCreators({ selectEvent }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
