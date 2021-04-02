import {combineReducers} from 'redux';
import userReducer from './user';
import addressStatusReducer from './addressStatus';
import savedDishReducer from './savedDish';
import savedChefReducer from './savedChef';
import cartReducer from './cart';

const myReducer = combineReducers({
  user: userReducer,
  addressStatus: addressStatusReducer,
  savedDish: savedDishReducer,
  savedChef: savedChefReducer,
  cart: cartReducer,
});
export default myReducer;
