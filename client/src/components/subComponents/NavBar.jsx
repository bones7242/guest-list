//EVENTTAB'S GO IN HERE BELOW THE LOGO

import React, { PropTypes, Component } from 'react';
//import './NavBar.css';


class NavBar extends Component {
	render() {
		return (
<<<<<<< HEAD
			<div className="nav-bar">
				<p>This is the nav bar sub component.</p>
=======
			<div className="nav-bar" className="left">
				<div className="row">
					<div className="col s12 m4 l3" className="valign-wrapper">

					</div>
				</div>
>>>>>>> 747c1286eb79c047222dccc0b148c46265692031
			</div>
		);
	}
}

NavBar.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default NavBar;
