
import React, { Component } from 'react';
import Guest from './Guest.jsx';


//=========================Search Bar Component=============================== 
class SearchBar extends Component {
  constructor(props) {
    console.log("props in Search", props);
    super(props);
    // this.state = {
    //   search: "",
    //   guest: this.props
    // };
  }    
  updateSearch(event) {
    //max characters is 20
    // this.setState({ search: event.target.value.substr(0, 20) });
    // console.log("inside update search", event);
    return this.props.onChangeSearchTerm(event.target.value);
  }
  render() {
    //  console.log("+++++++++++", this.state.guest);
    // let guestNames = this.props.guestNames.filter(
    //   (guestName) => {
    //     return guestName.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    //   });
    return (
      
      <div>
        <input type="text"
          onChange={this.updateSearch.bind(this)}
        />
      </div>
    );
  }
}
//=========================== End =============================

export default SearchBar;

