
/* This content component will display the components that are not part of the left-side Nav (AddGuest, AddEvent, EditEvent, EditGuest, EventDetail, or EditVenue) depending on the react-router route. */

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
