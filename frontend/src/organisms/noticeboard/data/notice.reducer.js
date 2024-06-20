/* eslint-disable default-param-last */
import { EMPTY_OBJECT } from '../../../utilities/shared/global.constants';
import { ACTION_TYPES } from '../constants/notice.constant';

const initialState = {
  allNotices: [],
  title: '',
  description: '',
  authorName: '',
  postType: '',
  priority: '',
};

const noticeReducer = (state = initialState, { type, payload }) => {
  const {
    allNotices,
    title,
    description,
    authorName,
    postType = '',
    priority,
  } = payload || EMPTY_OBJECT;
  switch (type) {
    case ACTION_TYPES.SET_NOTICE:
      return {
        ...state,
        allNotices,
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
    case ACTION_TYPES.SET_PRIORTIY:
      return {
        ...state,
        priority,
      };
    case ACTION_TYPES.SET_AUTHOR_NAME:
      return {
        ...state,
        authorName,
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
export default noticeReducer;
