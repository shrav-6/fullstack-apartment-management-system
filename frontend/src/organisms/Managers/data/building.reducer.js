/* eslint-disable default-param-last */
import { EMPTY_OBJECT } from '../../../utilities/shared/global.constants';
import { ACTION_TYPES } from '../constants/building.constant';

const initialState = {
  allBuildings: [],
  buildingName: '',
  address: '',
  phoneNumber: '',
  postType: '',
};

const buildingReducer = (state = initialState, { type, payload }) => {
  const {
    allBuildings,
    address,
    phoneNumber,
    postType = '',
  } = payload || EMPTY_OBJECT;
  switch (type) {
    case ACTION_TYPES.SET_BUILDINGS:
      return {
        ...state,
        allBuildings,
      };
    case ACTION_TYPES.SET_BUILDINGNAME:
      return {
        ...state,
        buildingName: payload,
      };
    case ACTION_TYPES.SET_ADDRESS:
      return {
        ...state,
        address,
      };
    case ACTION_TYPES.SET_PHONENUMBER:
      return {
        ...state,
        phoneNumber,
      };
    case ACTION_TYPES.SET_POST_TYPE:
      return {
        ...state,
        postType,
      };
    case ACTION_TYPES.RESET_POST_DATA:
      return {
        ...state,
        title: '',
        description: '',
        authorName: '',
        postType: '',
      };
    case ACTION_TYPES.RESET_ALL_DATA:
      return {
        ...state,
        ...initialState,
      };
    default:
      return state;
  }
};
export default buildingReducer;
