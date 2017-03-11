//EVENTTAB'S GO IN HERE BELOW THE LOGO

import React, { PropTypes, Component } from 'react';
//import './NavBar.css';
import EventTab from "./EventTab.jsx";
//import Materialize from "../../../../materialize";




class NavBar extends Component {
	render() {
		return (
			
			<div className="row" style={{paddingRight:"0px", marginRight:"0px", borderRightStyle:"dotted", borderColor:"white", borderWidth:"1px"}}>
			<div className="nav-bar grey darken-3" >
				
					<div className="col s12 m12 l12 valign-wrapper" style={{padding: '0'}}>
						<EventTab />
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
