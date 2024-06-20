import { combineReducers } from 'redux';
import noticeReducer from '../../organisms/noticeboard/data/notice.reducer';
<<<<<<< HEAD

const rootReducer = combineReducers({
  noticeReducer,
=======
import newsfeedReducer from '../../organisms/NewsFeeds/data/newsfeed.reducer';
import buildingReducer from '../../organisms/Managers/data/building.reducer';

const rootReducer = combineReducers({
  noticeReducer,
  newsfeedReducer,
  buildingReducer,
>>>>>>> mer/main
});

export default rootReducer;
