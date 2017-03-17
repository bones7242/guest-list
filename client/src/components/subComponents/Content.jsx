
//will contain newevent.js(form), addguestform.js(form), eventinfo.js(top info bar), and user list
import React, { PropTypes, Component } from 'react';
//import './Content.css';
import Attendee from './Attendee.jsx';

const Content = (children, currentEvent) => {
	return (
		<div className="row" style={{paddingRight:"0px", marginRight:"0px"}}>
			
			<div className="col s12 m12 l12 content grey darken-3 valign-wrapper" style={{padding: '0'}} >
			
				{/*the content children (add event, add guest, event details) will be filled in here*/}
				{children.children}

			</div>
		</div>
	);
}


export default Content;
