import React, { PropTypes, Component } from 'react';
//import './Attendee.css';


class Attendee extends Component {
	render() {
		return (
			<div className="row hoverable" style={{backgroundColor:"black"}}>
				<div className="hoverable ">
				
				
					<div className="col s12 m12 l12" >
						
						<li className="collection-item left" style={{color: 'white'}}>Alvin</li>
						

						<a className="btn-floating btn-large waves-effect waves-light red hoverable right" className="center-align"><i className="material-icons">add</i></a>
					</div>
				</div>
				
			</div>
		);
	}
}



export default Attendee;
