import React, { PropTypes, Component } from 'react';


class AddGuestForm extends Component {
	render() {
		return (
			<div className="add-guest-form">
				<div className="row blue darken-1">
				<form className="col s12">
					<div className="row">
						
						<div className="input-field col s6">
							<input placeholder="Name" id="AttendeeName"  type="text" className="validate"></input>
							<label for="name">Name</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="Affiliation" id="Affiliation"  type="text" className="validate"></input>
							<label for="Affiliation">Affiliation</label>
						</div>
						<div className="input-field col s2">
							<input id="email" type="email" class="validate"></input>
          					<label for="email">Email</label>
						</div>
						<div className="input-field col s2">
							<input placeholder="PhoneNumber" id="PhoneNumber"  type="text" className="validate"></input>
							<label for="PhoneNumber">PhoneNumber</label>
						</div>
					
					</div>

					
					<div class="input-field col s12">
					    <select>
					      <option value="" disabled selected>Plus One?</option>
					      <option value="1">Option 1</option>
					      <option value="2">Option 2</option>
					      <option value="3">Option 3</option>
					      <option value="4">Option 4</option>
					      <option value="5">Option 5</option>
					      <option value="6">Option 6</option>
					      <option value="7">Option 7</option>
					      <option value="8">Option 8</option>
					    </select>
					    <label>Materialize Select</label>
					 </div>

					<div className="row">
						
						<div className="input-field col s3">
							<p>
      							<input name="group1" type="radio" id="test1" />
      							<label for="test1">VIP</label>
    						</p>
						</div>
						<div className="input-field col s3">
							<p>
      							<input name="group1" type="radio" id="test1" />
      							<label for="test1">All Access</label>
    						</p>
						</div>
						<div className="input-field col s3">
							<p>
      							<input name="group1" type="radio" id="test1" />
      							<label for="test1">Press</label>
    						</p>
						<div className="input-field col s3">
							<p>
      							<input name="group1" type="radio" id="test1" />
      							<label for="test1">Photo</label>
    						</p>
						</div>
					
					</div>



				
				</form>
			</div>
			</div>
		);
	}
}

AddGuestForm.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default AddGuestForm;
