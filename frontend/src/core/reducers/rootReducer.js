import { combineReducers } from 'redux';
import noticeReducer from '../../organisms/data/notice.reducer';

const rootReducer = combineReducers({
  noticeReducer,
});

export default rootReducer;
