import {UPDATE_CART} from '../actions/type';

const initialState = null;

var cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART:
      state = action.newCart;
      return state;
    default:
      return state;
  }
};
export default cartReducer;
