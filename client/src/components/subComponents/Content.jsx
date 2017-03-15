
//will contain newevent.js(form), addguestform.js(form), eventinfo.js(top info bar), and user list
import React, { PropTypes } from 'react';
//import './Content.css';

const Content = ({children}) => {
	render() {
		return (
			<div className="row" style={{paddingRight:"0px", marginRight:"0px"}}>
				<div className="content grey darken-3 " >
				
					<div className="col s12 m12 l12 valign-wrapper" style={{padding: '0'}} >
					
					{children}

					</div>
				</div>
			</div>
		);
	}
}

Content.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default Content;
