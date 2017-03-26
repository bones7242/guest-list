
import React, { Component } from 'react';
import Guest from './Guest.jsx';


//=========================Search Bar Component=============================== 
class SearchBar extends Component {
  constructor(props) {
    super(props);
    
  }    

  updateSearch(event) {  

    return this.props.onChangeSearchTerm(event.target.value);
    
  }

  render() {

    return (
      <div className="row">
        <div className="col s12 m6 l4">
          <input 
            className="guest-search"
            type="text"
            onChange={this.updateSearch.bind(this)}
            placeholder="Type here to search by guest name..."
          />
        </div>
      </div>
    );
  }
}
//=========================== End =============================

export default SearchBar;

