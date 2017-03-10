import React, { PropTypes, Component } from 'react';
//import './NavBar.css';


class NavBar extends Component {
	render() {
		return (
			<div className="nav-bar">
				<p>This is the nav bar sub component.</p>
			</div>
		);
	}
}

NavBar.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default NavBar;
