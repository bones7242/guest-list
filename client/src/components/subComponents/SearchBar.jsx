
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
      
      <div>
        <input 
          type="text"
          onChange={this.updateSearch.bind(this)}
          placeholder="Search for a guest by name..."
        />
      </div>
    );
  }
}
//=========================== End =============================

export default SearchBar;

