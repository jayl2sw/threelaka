import { combineReducers } from '@reduxjs/toolkit'
import countReducer from './counter/counter-slice'

const rootReducer = combineReducers({
  counter: countReducer,  
})

export default rootReducer;