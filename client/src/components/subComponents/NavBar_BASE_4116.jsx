import React, { PropTypes, Component } from 'react';
import './NavBar.css';


class NavBar extends Component {
	render() {
		return (
			<div className="nav-bar">
				<p> this is the nav </p>
			</div>
		);
	}
}

NavBar.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default NavBar;
