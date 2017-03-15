//EVENTTAB'S GO IN HERE BELOW THE LOGO

import React, { PropTypes } from 'react';
import EventTab from "./EventTab.jsx";

const NavBar = ({events}) => {
	return (			
		<div className="row" style={{paddingRight:"0px", marginRight:"0px", borderRightStyle:"dotted", borderColor:"white", borderWidth:"1px"}}>
		<div className="nav-bar grey darken-3" >
			
				<div className="col s12 m12 l12" style={{padding: '0'}}> 
					
					{/*render an event tab for each event*/}
					{events.map((item, index) => {
						return (
							<EventTab 
								key={index} 
								headliner={item.headliner} 
								date={item.date} 
							/>
						)
					})}

				</div>
			</div>
		</div>
	);
}

NavBar.propTypes = {
	events: PropTypes.array.isRequired
};

export default NavBar;
