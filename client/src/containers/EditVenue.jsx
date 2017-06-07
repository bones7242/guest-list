/* This component will be rendered in the content container depending on the route.  It will import the venue's current information and provide functionality to update that information. */

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import Auth from '../modules/Auth'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DefaultSplash from '../components/DefaultSplash.jsx';

class EditVenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedVenue: this.props.venue,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.processForm = this.processForm.bind(this);
  }
  // re-render the component if someone refreshes the edit-venue route
  componentDidUpdate(prevProps) {
    // if the props were updated, then update the state
    if (prevProps.venue !== this.props.venue) {
      this.setState({
        updatedVenue: this.props.venue,
      });
    }
  }

  handleInputChange(event){
    const field = event.target.name;
    const updatedVenue = this.state.updatedVenue;
    updatedVenue[field] = event.target.value;
    this.setState({
      updatedVenue
    });
  }

  processForm(event) {
    event.preventDefault();
    // do basic front-end checks to make sure form was filled out correctly
    const updatedVenue = {
      _id: this.state.updatedVenue._id,
      name: this.state.updatedVenue.name,
      addressOne: this.state.updatedVenue.addressOne,
      addressTwo: this.state.updatedVenue.addressTwo,
      city: this.state.updatedVenue.city,
      state: this.state.updatedVenue.state,
      zip: this.state.updatedVenue.zip
    };
    // add the new event to the mongo database
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', '/api/venue');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // redirect to the dash, and have the dash display the active event
        this.props.router.replace('/dash');
      } else {
        console.log('there was an error in updating the guest. error:', xhr.response.message);
      }
    });
    xhr.send(JSON.stringify(updatedVenue));
  }

  render() {
    // check to make sure we have the venue information in props
    if (!this.state.updatedVenue) {
      return (
        <DefaultSplash message="Loading venue information..." />
      )
    }
    // if the venue information is ready, render the update form
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <h3 className="center-align">Edit Venue Information</h3>
          <form className="col s12 dashboard-form" id="update-venue-form" action="/" onSubmit={this.processForm}>
            {/* top row */}
            <div className="row">
              <div className=" col s12">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" value={this.state.updatedVenue.name} onChange={this.handleInputChange} />
              </div>
            </div>
            {/* second row*/}
            <div className="row">
              <div className=" col s6">
                <label htmlFor="addressOne">Address 1</label>
                <input id="addressOne" name="addressOne" type="text" value={this.state.updatedVenue.addressOne} onChange={this.handleInputChange} />
              </div>
              <div className=" col s6">
                <label htmlFor="addressTwo">Address 2</label>
                <input id="addressTwo" name="addressTwo" type="text" value={this.state.updatedVenue.addressTwo} onChange={this.handleInputChange} />
              </div>
            </div>
            <div className="row">
              <div className="col s6">
                <label htmlFor="city">City</label>
                <input id="city" name="city" type="text" value={this.state.updatedVenue.city} onChange={this.handleInputChange} />
              </div>
              <div className="col s2">
                <label htmlFor="state">State</label>
                <input id="state" name="state" type="text" value={this.state.updatedVenue.state} onChange={this.handleInputChange} />
              </div>
              <div className="col s4">
                <label htmlFor="zip">Zip</label>
                <input id="zip" name="zip" type="number" value={this.state.updatedVenue.zip} onChange={this.handleInputChange} />
              </div>
            </div>
          </form>
          {/* buttons */}
          <div className="row">
            <div className="col s6 right-align" >
              <Link className="grey darken-2 waves-effect waves-teal btn hoverable center" to={'/dash'}>Cancel</Link>
            </div>
            <div className="col s6 left-align" >
              <button type="submit" form="update-venue-form" className="blue accent-2 waves-effect waves-teal btn hoverable center">Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditVenue.propTypes = {
  venue: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    venue: state.venue,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVenue);
