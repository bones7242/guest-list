
//will contain newevent.js(form), AddGuest.js(form), eventinfo.js(top info bar), and user list
import React, { PropTypes, Component } from 'react';

const Content = (children) => {
	return (
		<div className="content" >
			<div className="row">

				<div className="col s12 m12 l12">

					{children.children}

				</div>
				
			</div>
		</div>
	);
}


export default Content;
