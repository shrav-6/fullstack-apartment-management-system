import { ACTION_TYPES } from '../constants/notice.constant';

export const setNotices = payload => ({
  type: ACTION_TYPES.SET_NOTICE,
  payload,
});
