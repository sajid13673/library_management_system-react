import { combineReducers } from 'redux';
import authReducer from './authReducer';
import bookReducer from './bookReducer';
import memberReducer from './memberReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
  members: memberReducer,
});

export default rootReducer;
