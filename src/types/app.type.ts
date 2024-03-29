import { IModalProps } from '@components/shared/modal';
import { EMedia } from '@constants';
import { EThemes } from 'constants/style.constant';
import { AnimatePresenceProps } from 'framer-motion';
import React from 'react';
import { Socket } from 'socket.io-client';
import { APP_DISPATCH_ACTIONS } from '@constants';

export type TScreenSize = 'DESKTOP' | 'TABLET' | 'MOBILE';
export type TLoading = {
  visible: boolean;
  component: any;
};
export enum ELanguage {
  En = 'en',
  Vi = 'vi',
}

type TModalAppState = {
  visible: boolean;
  props?: IModalProps;
};

export type TAppAction =
  | {
      type: APP_DISPATCH_ACTIONS.SET_SOCKET;
      payload: Socket | null;
    }
  | {
      type: APP_DISPATCH_ACTIONS.SET_LOADING;
      payload: TLoading;
    }
  | {
      type: APP_DISPATCH_ACTIONS.SET_MODAL;
      payload: TModalAppState;
    };

export type TAppState = {
  socket: Socket | null;
  loading: TLoading;
  theme: EThemes;
  language: ELanguage;
  modal: TModalAppState;
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

export interface IInfinityListDataPage<T> {
  data: T[];
  total: number;
}

export interface IInfinityListData<T> {
  pages: IInfinityListDataPage<T>[];
  pageParams: any[];
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

export interface IMedia {
  id?: string;
  url: string;
  type?: EMedia;
  file?: File | null;
}

export interface IMediaWithTweetId extends IMedia {
  tweetId: string;
}

export enum EUploadFileType {
  Tweet = 'tweet',
  Background = 'background',
  Avatar = 'avatar',
}

export interface BaseControlledRef {
  show?: () => void;
  hide?: () => void;
}

export interface NewAnimatePresenceProps
  extends Omit<AnimatePresenceProps, 'children'> {
  children: React.ReactNode;
}
