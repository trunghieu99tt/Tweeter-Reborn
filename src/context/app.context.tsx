import { APP_DISPATCH_ACTIONS } from '@constants';
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
  modal: {
    visible: false,
  },
};

const AppContext = React.createContext<{
  state: TAppState;
  dispatch: TAppDispatch;
} | null>(null);

const appReducer = (state: TAppState = initialState, action: TAppAction) => {
  switch (action.type) {
    case APP_DISPATCH_ACTIONS.SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case APP_DISPATCH_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: {
          visible: action.payload.visible,
          component: action.payload.component,
        },
      };
    case APP_DISPATCH_ACTIONS.SET_MODAL:
      return {
        ...state,
        modal: {
          visible: action.payload.visible,
          props: action.payload.props,
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
