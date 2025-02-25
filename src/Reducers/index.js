import { combineReducers } from "redux";
import authReducer from "./authReducer";
import bookReducer from "./bookReducer";
import memberReducer from "./memberReducer";
import borrowingReducer from "./borrowingReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
  members: memberReducer,
  borrowing: borrowingReducer,
});

export default rootReducer;
