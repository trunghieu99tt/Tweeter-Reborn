import { EThemes } from 'constants/style.constant';
import { Component } from 'react';
import { Socket } from 'socket.io-client';

export type TScreenSize = 'DESKTOP' | 'TABLET' | 'MOBILE';
export type TLoading = {
  visible: boolean;
  component: Component | null;
};
export enum ELanguage {
  En = 'en',
  Vi = 'vi',
}

export type TAppAction =
  | {
      type: 'SET_SOCKET';
      payload: Socket | null;
    }
  | {
      type: 'SET_LOADING';
      payload: TLoading;
    };

export type TAppState = {
  socket: Socket | null;
  loading: TLoading;
  theme: EThemes;
  language: ELanguage;
};

export type TAppDispatch = (action: TAppAction) => void;

export type TAppContextProps = {
  children: React.ReactNode;
};

export interface ISize {
  width: number | undefined;
  height: number | undefined;
}
export interface IGetList<T> {
  data: T[];
  total: number;
}

export interface IApiResponse<T = any> {
  readonly data?: T;
  readonly total?: number;
  readonly error?: Error;
  readonly message?: string;
  readonly statusCode?: number;
}

export interface IPaginationParams {
  limit: number;
  page: number;
}
