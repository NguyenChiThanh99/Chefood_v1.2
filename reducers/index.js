import {combineReducers} from 'redux';
import userReducer from './user';
import addressStatusReducer from './addressStatus';

const myReducer = combineReducers({
  user: userReducer,
  addressStatus: addressStatusReducer,
});
export default myReducer;
