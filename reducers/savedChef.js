import {UPDATE_SAVED_CHEF} from '../actions/type';

const initialState = null;

var savedChefReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SAVED_CHEF:
      state = action.newSavedChef;
      return state;
    default:
      return state;
  }
};
export default savedChefReducer;
