/* eslint-disable default-param-last */
import { EMPTY_OBJECT } from '../../../utilities/shared/global.constants';
import { ACTION_TYPES } from '../constants/newsfeed.constant';

const initialState = {
  allNewsfeed: [],
  title: '',
  description: '',
  postType: '',
};

const newsfeedReducer = (state = initialState, { type, payload }) => {
  const {
    allNewsfeed,
    title,
    description,
    postType = '',
  } = payload || EMPTY_OBJECT;
  switch (type) {
    case ACTION_TYPES.SET_NEWSFEED:
      return {
        ...state,
        allNewsfeed,
      };
    case ACTION_TYPES.SET_TITLE:
      return {
        ...state,
        title,
      };
    case ACTION_TYPES.SET_DESCRIPTION:
      return {
        ...state,
        description,
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
        postType: '',
      };
    default:
      return state;
  }
};
export default newsfeedReducer;
