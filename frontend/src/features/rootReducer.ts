import { combineReducers } from '@reduxjs/toolkit'
import countReducer from './counter/counter-slice'
import readReducer from './Read/read-slice';

const rootReducer = combineReducers({
  counter: countReducer,  
  read: readReducer,
})

export default rootReducer;