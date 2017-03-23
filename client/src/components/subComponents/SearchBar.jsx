import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  updateSearch(event) {
    //max characters is 20
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  render() {
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

export default SearchBar;
