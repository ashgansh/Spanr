import React from 'react';

const Loading = () => (
  <div>Loading</div>
);

const Err = ({ data: { error } }) => {   
  return [
    <h2>Error</h2>,
    <div>{error.message}</div>
  ]
};

const BlankState = () => (
  <div>No Assets</div>
);


export {
  Err,
  Loading,
  BlankState,
};

