const handlers = {
  handleOnClick: ({ locationId, user, createAsset }) => (e) => {
    e.preventDefault();
    createAsset()
      .then(({ data }) => console.log('got data', data))
      .catch((error) => console.log('there was an error', error));
  },
};

export default handlers;
