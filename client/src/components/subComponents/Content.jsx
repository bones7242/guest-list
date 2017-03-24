
//will contain newevent.js(form), addguestform.js(form), eventinfo.js(top info bar), and user list
import React, { PropTypes, Component } from 'react';

const Content = (children) => {
	return (

		<div className="row content">
			<div className="content" >
			
				<div className="col s12 m12 l12 valign-wrapper" style={{padding: '0'}} >
				
				{children.children}
				{/*<Attendee />*/}

				</div>
			</div>
		</div>
	);
}


export default Content;
