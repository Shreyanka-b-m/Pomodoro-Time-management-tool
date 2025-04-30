import { createSlice } from '@reduxjs/toolkit';
import { cookieGet, cookieSet } from '../../helpers/cookieSet';

type CategoryState = {
  name: 'Pomodoro' | 'Short Break' | 'Long Break';
  color: string;
};

const getInitialCategory = (): CategoryState => {
  const saved = cookieGet('POMO_MODE');
  if (saved === 'Short Break') return { name: 'Short Break', color: '#38858a' };
  if (saved === 'Long Break') return { name: 'Long Break', color: '#397097' };
  return { name: 'Pomodoro', color: '#ba4949' };
};

const initialState: CategoryState = getInitialCategory();

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setPomodoro: (state) => {
      state.name = 'Pomodoro';
      state.color = '#ba4949';
      cookieSet('POMO_MODE', 'Pomodoro');
    },
    setShortBreak: (state) => {
      state.name = 'Short Break';
      state.color = '#38858a';
      cookieSet('POMO_MODE', 'Short Break');
    },
    setLongBreak: (state) => {
      state.name = 'Long Break';
      state.color = '#397097';
      cookieSet('POMO_MODE', 'Long Break');
    },
  },
});

export const { setPomodoro, setShortBreak, setLongBreak } = categorySlice.actions;
export default categorySlice.reducer;