import React, { PropTypes, Component } from 'react';
//import './NavBar.css';


class NavBar extends Component {
	render() {
		return (
			<!--this is the footer.  should probably be a react componenet-->
		    <div className="row">
		    	<div className="col s12">
				    <div className="footer-copyright">
				        <div className="container">
				            © 2014 Copyright Text
				        </div>
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