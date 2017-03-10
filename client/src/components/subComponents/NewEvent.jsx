//this is the new event form that adds a new event tab to the bavbar. this goes in the content box.

import React, { PropTypes, Component } from 'react';
import './NewEvent.css';


class NewEvent extends Component {
	render() {
		return (
			<div className="new-event">
				<div className="add-guest-form">
				<div className="row">
			    <form className="col s12 m8 l9">
			      <div className="row">
			        <div className="input-field col s6 hoverable">
			          <input placeholder="Placeholder" id="first_name" type="text" className="validate">
			          <label for="first_name">First Name</label>
			        </div>
			        <div className="input-field col s6 hoverable">
			          <input id="last_name" type="text" className="validate">
			          <label for="last_name">Last Name</label>
			        </div>
			      </div>
			      <div className="row">
			        <div className="input-field col s12 hoverable">
			          <input disabled value="I am not editable" id="disabled" type="text" className="validate">
			          <label for="disabled">Disabled</label>
			        </div>
			      </div>
			      <div className="row">
			        <div className="input-field col s12 hoverable">
			          <input id="password" type="password" className="validate">
			          <label for="password">Password</label>
			        </div>
			      </div>
			      <div className="row">
			        <div className="input-field col s12 hoverable">
			          <input id="email" type="email" className="validate">
			          <label for="email">Email</label>
			        </div>
			      </div>
			      <div className="row">
			        <div className="col s12 hoverable">
			          This is an inline input field:
			          <div className="input-field inline">
			            <input id="email" type="email" className="validate">
			            <label for="email" data-error="wrong" data-success="right">Email</label>
			          </div>
			        </div>
			      </div>
			    </form>
			  </div>
        
			
			</div>
		);
	}
}

NewEvent.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default NewEvent;
