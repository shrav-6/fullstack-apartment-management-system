import { ACTION_TYPES } from '../constants/notice.constant';

export const setNotices = payload => ({
  type: ACTION_TYPES.SET_NOTICE,
  payload,
});
<<<<<<< HEAD
=======

export const setTitle = title => ({
  type: ACTION_TYPES.SET_TITLE,
  payload: { title },
});

export const setDescription = description => ({
  type: ACTION_TYPES.SET_DESCRIPTION,
  payload: { description },
});

export const setPriority = priority => ({
  type: ACTION_TYPES.SET_PRIORTIY,
  payload: { priority },
});

export const setAuthorName = authorName => ({
  type: ACTION_TYPES.SET_AUTHOR_NAME,
  payload: { authorName },
});

export const setPostType = postType => ({
  type: ACTION_TYPES.SET_POST_TYPE,
  payload: postType,
});

export const resetPostData = () => ({
  type: ACTION_TYPES.RESET_POST_DATA,
  payload: {},
});

export const resetAllData = () => ({
  type: ACTION_TYPES.RESET_ALL_DATA,
  payload: {},
});
>>>>>>> mer/main
