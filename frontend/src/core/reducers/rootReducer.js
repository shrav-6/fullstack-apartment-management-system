import { combineReducers } from 'redux';
import noticeReducer from '../../organisms/noticeboard/data/notice.reducer';
import newsfeedReducer from '../../organisms/NewsFeeds/data/newsfeed.reducer';

const rootReducer = combineReducers({
  noticeReducer,
  newsfeedReducer,
});

export default rootReducer;
