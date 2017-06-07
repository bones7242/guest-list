/* This container will be rendered in the EventDetail container.
One Guest container will be rendered for each guest on the guest list. */

import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { refreshActiveEvent, fetchEvents, refreshActiveGuest } from '../actions/index';
import Auth from '../modules/Auth';
import DefaultSplash from '../components/DefaultSplash.jsx';

class Guest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedIn: this.props.guest.isCheckedIn,
    };
    this.checkInGuest = this.checkInGuest.bind(this);
    this.editGuest = this.editGuest.bind(this);
    this.deleteGuest = this.deleteGuest.bind(this);
    this.emailGuest = this.emailGuest.bind(this);
  }
  // helper method to update the event in the database
  checkInGuest(event) {
    // Prevent the default action (which is the form submission event)
    event.preventDefault();
    // create the update object
    const checkInObject = {
      guestId: this.props.guest._id,
      eventId: this.props.guest.eventId,
      plusOne: this.props.guest.plusOne,
    };
    // decide wheter to increment or decriment guests
    let queryUrl = '';
    if (this.props.guest.isCheckedIn === false){
      queryUrl = '/api/guest/checkin';
    } else {
      queryUrl = '/api/guest/checkout';
    }
    // add the new event to the mongo database
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', queryUrl);
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.props.refreshActiveEvent(this.props.activeEvent._id, Auth.getToken());
        this.props.fetchEvents(this.props.activeEvent.venue, Auth.getToken());
      } else {
        console.log('there was an error in updating the event. error message:', xhr.response);
      }
    });
    xhr.send(JSON.stringify(checkInObject));
  }

  editGuest() {
    this.props.refreshActiveGuest(this.props.guest._id, Auth.getToken());
  }

  deleteGuest(){
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/api/guest/one/' + this.props.guest._id);
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // update the "active" event in the application state
        this.props.refreshActiveEvent(this.props.activeEvent._id, Auth.getToken());
        // update the specific event in the "events"array in the application state
        this.props.fetchEvents(this.props.activeEvent.venue, Auth.getToken());
      } else {
        console.log('Guest could not be deleted.  Check the server console logs');
      }
    });
    xhr.send();
  }
  // helper method to build and send an email to a guest
  emailGuest(){
    // exit the function if no email address was provided
    if (this.props.guest.email === '') {
      console.log('there is no email on file for this guest');
      return;
    }
    // create the email message components
    const to = this.props.guest.email;
    const subject = "You're on the list for " + this.props.activeEvent.headliner + ' at ' + this.props.venue.name;
    let text = 'Hi ' + this.props.guest.name + '!  \n\n' + this.props.venue.name + ' has added you to the guest list for the ' + this.props.activeEvent.headliner + ' show on ' + this.props.activeEvent.date + ' at ' + this.props.activeEvent.time + ' ' + this.props.activeEvent.am_pm + '\n\nYour details are as follows:';
    text += '\n + Name: ' + this.props.guest.name;
    if (this.props.guest.affiliation !== '') {
      text += '\n + Affiliation: ' + this.props.guest.affiliation;
    }
    text += '\n + Plus Ones: ' + this.props.guest.plusOne;
    text += '\n + Credential(s): ';
    if (this.props.guest.vip) { text += '\n    - VIP'; }
    if (this.props.guest.allAccess) { text += '\n    - All Access'; }
    if (this.props.guest.press) { text += '\n    - Press'; }
    if (this.props.guest.photo) { text += '\n    - Photo'; }
    text += '\n + Guest List(s): ';
    if (this.props.guest.houseList) {
      text += '\n    - House List';
    }
    if (this.props.guest.headlinerList) {
      text += '\n    - ' + this.props.activeEvent.headliner;
    }
    if (this.props.guest.supportOneList) {
      text += '\n    - ' + this.props.activeEvent.supportOne;
    }
    if (this.props.guest.supportTwoList) {
      text += '\n    - ' + this.props.activeEvent.supportTwo;
    }
    if (this.props.guest.supportThreeList) {
      text += '\n    - ' + this.props.activeEvent.supportThree;
    }
    text += '\n\nThanks, and enjoy the show!\n\n - The Guestmate Team';
    // email the guest to tell them they are on the list
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/email');
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        console.log(this.props.guest.name + ' has been emailed');
      } else {
        console.log('there was an error in emailing the guest. error:', xhr.response);
      }
    });
    xhr.send(JSON.stringify({
      to: to,
      subject: subject,
      text: text
    }));
  }

  myColor() {
    if (this.props.guest.isCheckedIn === true) {
      return 'grey darken-2';
    }
    return 'blue accent-2';
  }

  myText() {
    if (this.props.guest.isCheckedIn === true) {
      return 'UNDO';
    }
    return 'CHECK IN';
  }

  backgroundColor() {
    if (this.props.guest.isCheckedIn === true) {
      return '#494949';
    }
    return 'grey darken-3';
  }

  render(){
    // check to make sure a venue is in the props.
    if (!this.props.guest) {
      return (
        <DefaultSplash message="Loading guest" />
      )
    }
    // otherwise render the component
    return (
      <tr className={'bordered ' + this.backgroundColor()}>
        <td className="guest--td guest-name">
          {this.props.guest.name && this.props.guest.name.toUpperCase()}
        </td>
        <td className="guest--td">
          {this.props.guest.affiliation}
        </td>
        <td className="guest--td">
          {this.props.guest.plusOne}
        </td>
        <td className="guest--td">
          {this.props.guest.vip && <p>VIP</p>}
          {this.props.guest.allAccess && <p>All Access</p>}
          {this.props.guest.photoPass && <p>Photo Pass</p>}
          {this.props.guest.pressPass && <p>Press Pass</p>}
        </td>
        <td className="guest--td">
          {this.props.guest.houseList && <p>House</p>}
          {this.props.guest.headlinerList && <p>{this.props.activeEvent.headliner}</p>}
          {this.props.guest.supportOneList && <p>{this.props.activeEvent.supportOne}</p>}
          {this.props.guest.supportTwoList && <p>{this.props.activeEvent.supportTwo}</p>}
          {this.props.guest.supportThreeList && <p>{this.props.activeEvent.supportThree}</p>}
        </td>
        <td className="guest--td center-align">
          <button className={'waves-effect waves-light btn small hoverable ' + this.myColor()} onClick={this.checkInGuest}>{this.myText()}</button>
        </td>
        <td className="guest--td right-align">
          <Link className="grey darken-2 btn-floating btn-small waves-effect waves-light hoverable" onClick={this.emailGuest}>
            <i className="material-icons">email</i>
          </Link>
          <Link className="grey darken-2 btn-floating btn-small waves-effect waves-light hoverable" onClick={this.editGuest} to="/dash/edit-guest">
            <i className="material-icons">mode_edit</i>
          </Link>
          <Link className="grey darken-2 btn-floating btn-small waves-effect waves-light hoverable" onClick={this.deleteGuest}>
            <i className="material-icons">delete</i>
          </Link>
        </td>
      </tr>
    );
  }
}

Guest.propTypes = {
  guest: PropTypes.object.isRequired,
  refreshActiveEvent: PropTypes.func.isRequired,
  fetchEvents: PropTypes.func.isRequired,
  activeEvent: PropTypes.object.isRequired,
  refreshActiveGuest: PropTypes.func.isRequired,
  venue: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent,
    venue: state.venue,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ refreshActiveEvent, fetchEvents, refreshActiveGuest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Guest);
