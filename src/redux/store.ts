import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import countReducer from './slices/countSlice';
import timeReducer from './slices/timeSlice';
import timeSwitchReducer from './slices/timeSwitchSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    count: countReducer,
    time: timeReducer,
    timeSwitch: timeSwitchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;