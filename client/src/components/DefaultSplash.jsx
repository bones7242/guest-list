
/* This is a fallback
component to be used when data is missing and
we want to display a quick message to the user */

import React, { PropTypes } from 'react';

const DefaultSplash = ({ message }) => {
  return (
    <div className="row ">
      <div className="col s12 m12 l 12 valign-wrapper">
        <h2 className="valign center" style={{ color: 'white' }}>{message}</h2>
      </div>
    </div>
  );
}

DefaultSplash.propTypes = {
  message: PropTypes.string.isRequired,
};

export default DefaultSplash;
