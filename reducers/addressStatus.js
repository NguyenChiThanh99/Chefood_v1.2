import {UPDATE_ADDRESS_STATUS} from '../actions/type';

const initialState = {province: null, district: null, ward: null, detail: ''};

var addressStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ADDRESS_STATUS:
      state = action.newStatus;
      return state;
    default:
      return state;
  }
};
export default addressStatusReducer;
