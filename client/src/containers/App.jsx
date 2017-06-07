/* This container will hold the entire app. */

import React, { PropTypes } from 'react';
import TopNav from '../components/TopNav.jsx';

const App = (props) => {
  return (
    <div>
      {/* render the top nav bar */}
      <TopNav />
      {/* render children */}
      {props.children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
