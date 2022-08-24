/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { EThemes } from 'constants/style.constant';
import React, { useContext, useMemo, useReducer } from 'react';
import {
  TAppState,
  TAppAction,
  TAppDispatch,
  TAppContextProps,
  ELanguage,
} from '../types/app.type';

const initialState: TAppState = {
  socket: null,
  loading: {
    visible: false,
    component: null,
  },
  theme: EThemes.LIGHT,
  language: ELanguage.En,
};

const AppContext = React.createContext<{
  state: TAppState;
  dispatch: TAppDispatch;
} | null>(null);

const appReducer = (state: TAppState = initialState, action: TAppAction) => {
  switch (action.type) {
    case 'SET_SOCKET':
      return {
        ...state,
        socket: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: {
          visible: action.payload.visible,
          component: action.payload.component,
        },
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }: TAppContextProps) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('AppContext is not available');
  }
  return context;
};

export default AppProvider;
