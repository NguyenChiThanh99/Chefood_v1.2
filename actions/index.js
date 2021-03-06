import {UPDATE_USER, UPDATE_ADDRESS_STATUS} from './type';

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
