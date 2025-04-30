import { createSlice } from '@reduxjs/toolkit';
import { cookieGet, cookieSet } from '../../helpers/cookieSet';

// Helper to get initial time from cookies or use default
const getInitialTime = (cookieName: string, defaultValue: number) => {
  const cookieValue = cookieGet(cookieName);
  return cookieValue ? parseInt(cookieValue) : defaultValue;
};

const initialState = {
  pomodoro: getInitialTime('POMO_NUMBER', 1500), // 25 minutes
  shortBreak: getInitialTime('SB_NUMBER', 300),  // 5 minutes
  longBreak: getInitialTime('LB_NUMBER', 900)    // 15 minutes
};

export const timeSlice = createSlice({
  name: 'time',
  initialState,
  reducers: {
    setPomodoroTime: (state, action) => {
      state.pomodoro = action.payload;
      cookieSet('POMO_NUMBER', action.payload.toString());
    },
    setShortBreakTime: (state, action) => {
      state.shortBreak = action.payload;
      cookieSet('SB_NUMBER', action.payload.toString());
    },
    setLongBreakTime: (state, action) => {
      state.longBreak = action.payload;
      cookieSet('LB_NUMBER', action.payload.toString());
    },
  },
});

export const { setPomodoroTime, setShortBreakTime, setLongBreakTime } = timeSlice.actions;
export default timeSlice.reducer;