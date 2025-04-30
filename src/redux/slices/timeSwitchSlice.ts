import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRunning: false,
};

export const timeSwitchSlice = createSlice({
  name: 'timeSwitch',
  initialState,
  reducers: {
    start: (state) => {
      state.isRunning = true;
    },
    pause: (state) => {
      state.isRunning = false;
    },
    toggle: (state) => {
      state.isRunning = !state.isRunning;
    },
  },
});

export const { start, pause, toggle } = timeSwitchSlice.actions;
export default timeSwitchSlice.reducer;