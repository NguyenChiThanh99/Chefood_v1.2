import {
  UPDATE_USER,
  UPDATE_ADDRESS_STATUS,
  UPDATE_SAVED_CHEF,
  UPDATE_CART,
  UPDATE_SAVED_DISH,
} from './type';

export const updateUser = (newUser) => {
  return {
    type: UPDATE_USER,
    newUser: newUser,
  };
};

export const updateAddressStatus = (newStatus) => {
  return {
    type: UPDATE_ADDRESS_STATUS,
    newStatus: newStatus,
  };
};

export const updateSavedDish = (newSavedDish) => {
  return {
    type: UPDATE_SAVED_DISH,
    newSavedDish: newSavedDish,
  };
};

export const updateSavedChef = (newSavedChef) => {
  return {
    type: UPDATE_SAVED_CHEF,
    newSavedChef: newSavedChef,
  };
};

export const updateCart = (newCart) => {
  return {
    type: UPDATE_CART,
    newCart: newCart,
  };
};
