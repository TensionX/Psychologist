import { combineReducers } from "@reduxjs/toolkit";

import {
  userReducer,
  clientsReducer,
  testsReducer,
  activeTestReducer,
  loading,
  errorMsg,
  clientTestsReducer
} from "./user/user.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  clients: clientsReducer,
  tests: testsReducer,
  activeTest: activeTestReducer,
  clientTests: clientTestsReducer,
  errorMsg,
  loading
});

export default rootReducer;
