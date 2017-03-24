import React, { Component } from 'react';
import Guest from './Guest.jsx';


//=========================Search Bar Component=============================== 
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      guest: this.props.Guest
    };
  }    
  updateSearch(event) {
    //max characters is 20
    this.setState({ search: event.target.value.substr(0, 20) });
    
  }
  render() {
     console.log("+++++++++++", this.state.guest);
    // let guestNames = this.props.guestNames.filter(
    //   (guestName) => {
    //     return guestName.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    //   });
    return (
      
      <div>
        <input type="text" value={this.state.search}
          onChange={this.updateSearch.bind(this)}
        />
      </div>
    );
  }
}
//=========================== End =============================

export default SearchBar;
