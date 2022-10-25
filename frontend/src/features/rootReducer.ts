import { combineReducers } from '@reduxjs/toolkit'
import countReducer from './counter/counter-slice'
import readReducer from './Read/read-slice';
import authReducer from './auth/authSlice';
const rootReducer = combineReducers({
  counter: countReducer,  
  read: readReducer,
  auth: authReducer,
})

export default rootReducer;