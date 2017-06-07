/*  This container will be displayed inside the app container.  It will be displayed instead of home/login/signup if a user logs in successfully. */

import React, { PropTypes, Component } from "react";
import Auth from "../modules/Auth";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchVenue } from "../actions/index";
import NavBar from '../containers/NavBar.jsx';

class DashboardPage extends Component {
  // lifecycle methods.
  componentWillMount() {
    // make a request to the server to get all of the venue information related to this user
    this.props.fetchVenue(localStorage.getItem('userId'), Auth.getToken());
  }
  // render the component
  render() {
    return (
      <div className="row dashboard">
        <div className="col s3 m3 l3 grey darken-3" style={{ padding: '0px' }}>
          {/* the NavBar will show the logo and all the upcoming events */}
          <NavBar />
        </div>
        <div className="col s9 m9 l9" style={{ padding: '0px' }}>
          {/* Content will show the main page content */ }
          { this.props.children }
        </div>
      </div>
    );
  }
}

DashboardPage.propTypes = {
  children: PropTypes.element.isRequired,
  fetchVenue: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    venue: state.venue,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchVenue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
