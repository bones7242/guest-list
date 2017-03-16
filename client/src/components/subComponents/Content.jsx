
//will contain newevent.js(form), addguestform.js(form), eventinfo.js(top info bar), and user list
import React, { PropTypes, Component } from 'react';
//import './Content.css';
import Attendee from './Attendee.jsx';

const Content = (children) => {
	return (
		<div className="row" style={{paddingRight:"0px", marginRight:"0px"}}>
			<div className="content grey darken-3 " >
			
				<div className="col s12 m12 l12 valign-wrapper" style={{padding: '0'}} >
				
				{children.children}
				{/*<Attendee />*/}

				</div>
			</div>
		</div>
	);
}

Content.propTypes = {
	children: PropTypes.node.isRequired,
	routes: PropTypes.array
};

export default Content;
