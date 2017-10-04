import { compose, withState, withHandlers } from 'recompose';
import handlers from './handlers';

const enhance = compose(
  withState('name', 'updateName', ''),
  withState('location', 'updateLocation', ''),
  withHandlers(handlers),
);

export default enhance;
