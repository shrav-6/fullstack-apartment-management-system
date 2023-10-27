import { combineReducers } from 'redux';
import noticeReducer from '../../organisms/noticeboard/data/notice.reducer';

const rootReducer = combineReducers({
  noticeReducer,
});

export default rootReducer;
