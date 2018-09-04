import { combineReducers } from 'redux';
import app from 'reducers/app';
import people from 'reducers/people';
import user from 'reducers/user';
import flight from 'reducers/flight';
import flight2 from 'reducers/flight2';
import flight3 from 'reducers/flight3';

export default combineReducers({
  app,
  people,
  user,
  flight,
  flight2,
  flight3,
});
