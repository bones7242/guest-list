/* This container will display inside the content component
depending on the route.  It will provide the form and functionality for adding a new guest. */

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { refreshActiveEvent, fetchEvents } from '../actions/index';
import Auth from '../modules/Auth'; // import authentication methods
import ContentHeader from './ContentHeader.jsx';
import DefaultSplash from '../components/DefaultSplash.jsx';

class AddGuest extends Component {
  constructor(props) {
    super(props);
    // add default values for the fields when setting the initial state
    this.state = {
      newGuest: {
        eventId: '',
        name: '',
        email: '',
        affiliation: '',
        phone: '',
        plusOne: 0,
        vip: false,
        allAccess: false,
        photoPass: false,
        pressPass: false,
        houseList: false,
        headlinerList: false,
        supportOneList: false,
        supportTwoList: false,
        supportThreeList: false,
        isCheckedIn: false,
      },
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.processGuestForm = this.processGuestForm.bind(this);
    this.toggleInput = this.toggleInput.bind(this);
    this.createNewGuest = this.createNewGuest.bind(this);
    this.emailGuest = this.emailGuest.bind(this);
  }

  // event handler for input elements.  This takes the input and inserts it into the state using the 'name' attr of the element that triggered it as the key.
  handleInputChange(event) {
    const field = event.target.name;
    const newGuest = this.state.newGuest;
    newGuest[field] = event.target.value;
    this.setState({
      newGuest,
    });
  }
  // method to toggle a state value between true and false
  toggleInput(event){
    const field = event.target.name;
    const newGuest = this.state.newGuest;
    // toggle the state for the particular field
    if (newGuest[field] === true) {
      newGuest[field] = false;
    } else if (newGuest[field] === false) {
      newGuest[field] = true;
    }
    // set the state
    this.setState({
      newGuest,
    });
  }

  processGuestForm(event) {
    event.preventDefault();
    // do basic front-end checks to make sure form was filled out correctly
    if (this.state.newGuest.email === '') {
      alert('No email provided.  This guest will not be notified that they are on the guest list for this show.');
    }
    // create a newGuest object out of the state & add the activeEvent id
    const newGuest = this.state.newGuest;
    newGuest.eventId = this.props.activeEvent._id;
    // create the event
    this.createNewGuest(newGuest);
  }
  // create a new guest, if successful, redirect to dashboard.
  createNewGuest(newGuest) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/guest');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // send email to the new guest
        this.emailGuest(newGuest);
        // update the "active event"" in the application state
        this.props.refreshActiveEvent(this.props.activeEvent._id, Auth.getToken());
        // update the specific event in the "events" array in the application state
        this.props.fetchEvents(this.props.venue._id, Auth.getToken());
        // redirect to the dash, and have the dash select the newly created event for display
        this.props.router.replace('/dash/event');
      } else {
        alert('there was an error in creating the guest. error:', xhr.response.message);
      }
    });
    xhr.send(JSON.stringify(newGuest));
  }
  // this method will create an email and send it to the guest
  emailGuest(guest) {
    // exit the function if no email address was provided
    if (guest.email === '') {
      return;
    }
    // create the email message components
    const to = guest.email;
    const subject = `You're on the list for ${this.props.activeEvent.headliner} at ${this.props.venue.name}`;
    let text = `Hi ${guest.name}!  \n\n${this.props.venue.name} has added you to the guest list for the ${this.props.activeEvent.headliner} show on ${this.props.activeEvent.date} at ${this.props.activeEvent.time} ${this.props.activeEvent.am_pm}\n\nYour details are as follows:`;
    text += `\n + Name: ${  guest.name}`;
    if (guest.affiliation !== '') {
      text += `\n + Affiliation: ${guest.affiliation}`;
    }
    text += `\n + Plus Ones: ${guest.plusOne}`;
    text += '\n + Credential(s): ';
    if (guest.vip) { text += '\n    - VIP'; }
    if (guest.allAccess) { text += '\n    - All Access'; }
    if (guest.press) { text += '\n    - Press'; }
    if (guest.photo) { text += '\n    - Photo'; }
    text += '\n + Guest List(s): ';
    if (guest.houseList) { text += '\n    - House List'; }
    if (guest.headlinerList) { text += `\n    - ${  this.props.activeEvent.headliner}`; }
    if (guest.supportOneList) { text += `\n    - ${  this.props.activeEvent.supportOne}`; }
    if (guest.supportTwoList) { text += `\n    - ${  this.props.activeEvent.supportTwo}`; }
    if (guest.supportThreeList) { text += `\n    - ${  this.props.activeEvent.supportThree}`; }
    text += '\n\nThanks, and enjoy the show!\n\n - The Guestmate Team';
    // email the guest to tell them they are on the list
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/email');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log(`${guest.name} has been emailed`);
      } else {
        console.log('there was an error in emailing the guest. error:', xhr.response.message, xhr.response.details);
      }
    });
    xhr.send(JSON.stringify({
      to: to,
      subject: subject,
      text: text,
    }));
  }
  // render the component
  render() {
    // check to make sure an event is active...
    if (!this.props.activeEvent) {
      return (
        <DefaultSplash message="Select an event to start adding guests" />
      );
    }
    // if an event is active, show the add-guest form...
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <ContentHeader />
          <h3 className="center-align">Add A New Guest To Your List</h3>
          <form className="col s12 dashboard-form" id="new-guest-form" action="/" onSubmit={this.processGuestForm}>
            {/*top row*/}
            <div className="row">					
              <div className="input-field col s6">
                <input id="AttendeeName"  name="name" type="text" className="validate" onChange={this.handleInputChange}></input>
                <label htmlFor="name">Name</label>
              </div>
              <div className="input-field col s2">
                <input  id="Affiliation" name="affiliation" type="text" className="validate" onChange={this.handleInputChange}></input>
                <label htmlFor="Affiliation">Affiliation</label>
              </div>
              <div className="input-field col s2">
                <input id="email" type="email" name="email" className="validate" onChange={this.handleInputChange}></input>
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s2">
                <input id="PhoneNumber" name="phone"  type="text" className="validate" onChange={this.handleInputChange}></input>
                <label htmlFor="PhoneNumber">PhoneNumber</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s4">
                <input  id="plusOne" name="plusOne"  type="text" className="validate" onChange={this.handleInputChange}></input>
                <label htmlFor="plusOne">Plus One(s)</label>
              </div>
              <div className="input-field col s2">
                <input name="vip" type="radio" id="vip" onChange={this.toggleInput} checked={this.state.newGuest.vip} />
                <label htmlFor="vip">VIP</label>
              </div>
              <div className="input-field col s2">
                <input name="allAccess" type="radio" id="allAccess" onChange={this.toggleInput} checked={this.state.newGuest.allAccess}/>
                <label htmlFor="allAccess">All Access</label>
              </div> 
              <div className="input-field col s2">
                <input name="pressPass" type="radio" id="pressPass" onChange={this.toggleInput} checked={this.state.newGuest.pressPass} />
                <label htmlFor="pressPass">Press</label>
              </div>
              <div className="input-field col s2">
                <input name="photoPass" type="radio" id="photoPass" onChange={this.toggleInput}  checked={this.state.newGuest.photoPass} />
                <label htmlFor="photoPass">Photo</label>
              </div>
            </div>
            {/*bottom row*/}
            <div className="row">
              <div className=" input-field col s2">
                <input className="list-radios" name="houseList" type="radio" id="houseList" onChange={this.toggleInput} checked={this.state.newGuest.houseList} />
                <label htmlFor="houseList">House List</label>
              </div>
              {(this.props.activeEvent.headliner != '') &&
              <div className=" input-field col s2">
                <input name="headlinerList" type="radio" id="headlinerList" onChange={this.toggleInput} checked={this.state.newGuest.headlinerList} />
                <label htmlFor="headlinerList">{this.props.activeEvent.headliner} List</label>
              </div> }
              {(this.props.activeEvent.supportOne != '') &&
              <div className=" input-field col s2">
                <input name="supportOneList" type="radio" id="supportOneList" onChange={this.toggleInput}  checked={this.state.newGuest.supportOneList} />
                <label htmlFor="supportOneList">{this.props.activeEvent.supportOne} List</label>
              </div> }
              {(this.props.activeEvent.supportTwo != '') &&
              <div className=" input-field col s2">
                <input name="supportTwoList" type="radio" id="supportTwoList" onChange={this.toggleInput}  checked={this.state.newGuest.supportTwoList} />
                <label htmlFor="supportTwoList">{this.props.activeEvent.supportTwo} List</label>
              </div> }
              {(this.props.activeEvent.supportThree != '') &&
              <div className=" input-field col s2">
                <input name="supportThreeList" type="radio" id="supportThreeList" onChange={this.toggleInput}  checked={this.state.newGuest.supportThreeList} />
                <label htmlFor="supportThreeList">{this.props.activeEvent.supportThree} List</label>
              </div> }
            </div>
          </form>
          {/*buttons */}
          <div className="row">
            <div className="col s6 right-align" >
              <Link className="grey darken-2 waves-effect waves-teal btn hoverable center" to={'/dash/event'}>Cancel</Link>
            </div>
            <div className="col s6 left-align" >
              <button type="submit" form="new-guest-form" className="blue accent-2 waves-effect waves-teal btn hoverable center">Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddGuest.propTypes = {
  activeEvent: PropTypes.object.isRequired,
  refreshActiveEvent: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  router: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent,
    venue: state.venue,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ refreshActiveEvent, fetchEvents }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGuest);
