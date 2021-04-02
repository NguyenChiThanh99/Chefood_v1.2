import {UPDATE_SAVED_DISH} from '../actions/type';

const initialState = null;

var savedDishReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SAVED_DISH:
      state = action.newSavedDish;
      return state;
    default:
      return state;
  }
};
export default savedDishReducer;
