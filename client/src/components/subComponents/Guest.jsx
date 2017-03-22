import React, { PropTypes, Component } from 'react';
//import './Attendee.css';


const Guest = ({guest, headliner, supportOne, supportTwo, supportThree}) => {
	return (
	
		
			<tr className="grey darken-4">
				<td className="white-text text-blue-grey lighten-5 hoverable">{guest.name}</td>
				<td className="white-text text-blue-grey lighten-5">{guest.email}</td>
				<td className="white-text text-blue-grey lighten-5">{guest.affiliation}</td>
				<td className="white-text text-blue-grey lighten-5">{guest.phone}</td>
				<td className="white-text text-blue-grey lighten-5">{guest.plusOne}</td>
				<td>
					{guest.vip}
					{guest.allAccess}
					{guest.photoPass}
					{guest.pressPass}
				</td>
				<td>
					{guest.houseList && <p>House</p>}
					{guest.headlinerList && <p>{headliner}</p>}
					{guest.supportOneList && <p>{supportOne}</p>}
					{guest.supportTwoList && <p>{supportTwo}</p>}
					{guest.supportThreeList && <p>{supportThree}</p>}
				</td>
				<td>
					<a className="waves-effect waves-light btn deep-purple darken-3 hoverable">ENTERED</a>
				</td>
				<td>
					
	  				<a className="btn-floating btn-small waves-effect waves-light blue-grey lighten-2 hoverable" style={{marginRight:"10"}}><i className="material-icons">delete</i></a>
					
	 				 <a className="btn-floating btn-small waves-effect waves-light blue-grey lighten-2 hoverable"><i className="material-icons">shuffle</i></a>
				</td>
				<div class="divider"></div>
			</tr>
			
	);
}



export default Guest;
