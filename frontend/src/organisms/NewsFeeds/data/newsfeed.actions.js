import { ACTION_TYPES } from '../constants/newsfeed.constant';

export const setnewsfeed = payload => ({
  type: ACTION_TYPES.SET_NEWSFEED,
  payload,
});

export const setTitle = title => ({
  type: ACTION_TYPES.SET_TITLE,
  payload: { title },
});

export const setDescription = description => ({
  type: ACTION_TYPES.SET_DESCRIPTION,
  payload: { description },
});

export const setPostType = postType => ({
  type: ACTION_TYPES.SET_POST_TYPE,
  payload: postType,
});

export const resetPostData = () => ({
  type: ACTION_TYPES.RESET_POST_DATA,
  payload: {},
});
