import { ACTION_TYPES } from '../constants/building.constant';

export const setBuildings = payload => ({
  type: ACTION_TYPES.SET_BUILDINGS,
  payload,
});

export const setBuildingName = payload => ({
  type: ACTION_TYPES.SET_BUILDINGNAME,
  payload,
});

export const setAddress = address => ({
  type: ACTION_TYPES.SET_ADDRESS,
  payload: { address },
});

export const setPhoneNumber = phoneNumber => ({
  type: ACTION_TYPES.SET_PHONENUMBER,
  payload: { phoneNumber },
});
