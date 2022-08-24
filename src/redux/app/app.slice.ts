import { createSlice } from '@reduxjs/toolkit';
import { ELanguage, TAppState } from '@type/app.type';
import { EThemes } from 'constants/style.constant';

const appInitialState: TAppState = {
  theme: EThemes.LIGHT,
  language: ELanguage.En,
  loading: {
    visible: false,
    component: null,
  },
  socket: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: appInitialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
  },
});

export const { setTheme, setLanguage, setLoading, setSocket } =
  appSlice.actions;
export default appSlice.reducer;
