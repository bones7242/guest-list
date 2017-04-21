/* This is a fallback component to render if a user tries to access a page without being properly authenticated or if they are not authorized. */

import React, { PropTypes, Component } from 'react';

const PermissionDenied = () => {
	return (
		<div>
			<h2>404: PERMISSION DENIED</h2>
			<h5>Please log in or create a profile to access this page</h5>
		</div>
	);
}

export default PermissionDenied;