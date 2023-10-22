/* eslint-disable default-param-last */
import { EMPTY_OBJECT } from '../../../utilities/shared/global.constants';
import { ACTION_TYPES } from '../constants/notice.constant';

const initialState = {
  allNotices: [],
};

const noticeReducer = (state = initialState, { type, payload }) => {
  const {
    allNotices,
  } = payload || EMPTY_OBJECT;
  switch (type) {
    case ACTION_TYPES.SET_NOTICE:
      return {
        ...state,
        allNotices,
      };
    default:
      return state;
  }
};
export default noticeReducer;
