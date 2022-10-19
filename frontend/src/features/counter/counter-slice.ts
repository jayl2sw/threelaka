import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CurrentDisplayState = {
  clicks: number
}

let initialState: CurrentDisplayState = {
  clicks: 0,
}

const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    fetchAdd() {
      console.log("1초 뒤에 1 더해짐")  
    },
    addCount(state, action: PayloadAction<number>) {
      state.clicks += action.payload
    },
    minusCount(state, action: PayloadAction<number>) {
      state.clicks -= action.payload
    }
  }
})

// Actions
export const countActions = countSlice.actions;

// Reducers
const countReducer = countSlice.reducer;
export default countReducer;