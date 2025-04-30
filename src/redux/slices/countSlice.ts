import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cookieGet, cookieSet } from '../../helpers/cookieSet';

const getInitialCount = () => {
  const cookieValue = cookieGet('POMO_VALUE');
  return cookieValue ? parseInt(cookieValue) : 0;
};

const initialState = {
  value: getInitialCount()
};

export const countSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      cookieSet('POMO_VALUE', state.value.toString());
    },
    reset: (state) => {
      state.value = 0;
      cookieSet('POMO_VALUE', '0');
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
      cookieSet('POMO_VALUE', action.payload.toString());
    }
  },
});

export const { increment, reset, setCount } = countSlice.actions;
export default countSlice.reducer;