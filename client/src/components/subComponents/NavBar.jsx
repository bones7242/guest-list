//EVENTTAB'S GO IN HERE BELOW THE LOGO

import React, { PropTypes, Component } from 'react';
//import './NavBar.css';


class NavBar extends Component {
	render() {
		return (
			<div className="nav-bar" className="left">
				<div className="row">
					<div className="col s12 m4 l3" className="valign-wrapper">

					</div>
				</div>
			</div>
		);
	}
}

NavBar.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default NavBar;
