import { combineReducers } from 'redux';
import noticeReducer from '../../organisms/noticeboard/data/notice.reducer';
import newsfeedReducer from '../../organisms/NewsFeeds/data/newsfeed.reducer';
import buildingReducer from '../../organisms/Managers/data/building.reducer';

const rootReducer = combineReducers({
  noticeReducer,
  newsfeedReducer,
  buildingReducer,
});

export default rootReducer;
