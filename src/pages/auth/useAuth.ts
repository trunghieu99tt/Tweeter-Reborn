import { ELocalStorageKey } from '@constants';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { setGlobalLoading } from '@redux/app/app.slice';
import { EGender } from 'constants/user.constant';
import _ from 'lodash';
import React, { useCallback, useRef, useState } from 'react';
import { IconType } from 'react-icons';
import { BiLock, BiMailSend, BiUserCircle, BiUserPin } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { ROUTES } from 'routes';
import { useAuthService } from 'services/auth.service';
import { AppDispatch } from 'store';

export enum EAuthScreen {
  Login = 'login',
  Register = 'register',
}

export type TInputField = {
  label: string;
  name: string;
  Icon: IconType;
  type: string;
};

export const loginFields: TInputField[] = [
  {
    label: 'username',
    name: 'username',
    Icon: BiUserCircle,
    type: 'text',
  },
  {
    label: 'password',
    name: 'password',
    Icon: BiLock,
    type: 'password',
  },
];
export const registerFields: TInputField[] = [
  {
    name: 'passwordConfirm',
    label: 'Confirm Password',
    Icon: BiLock,
    type: 'text',
  },
  {
    label: 'Name',
    name: 'name',
    Icon: BiUserPin,
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    Icon: BiMailSend,
    type: 'text',
  },
];

const getFieldNames = (fields: TInputField[]) => fields.map(({ name }) => name);

export const useAuth = () => {
  const navigate = useNavigate();
  const [screen, setScreen] = useState<EAuthScreen>(EAuthScreen.Login);
  const [, setGender] = useState<EGender>(EGender.UNKNOWN);
  const { loginMutation, registerMutation, refreshGetMe } = useAuthService();
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const [, setAccessToken] = useLocalStorage(ELocalStorageKey.AccessToken, '');

  const onChangeScreen =
    (newScreen: EAuthScreen) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (screen !== newScreen) {
        formRef.current.reset();
        setScreen(newScreen);
      }
    };

  const onChangeGender = useCallback(
    (newGender: EGender) => setGender(newGender),
    [],
  );

  const onAuthSuccess = (data) => {
    setAccessToken(data?.accessToken);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());

    const input = _.pick(
      fieldValues,
      screen === EAuthScreen.Login
        ? getFieldNames(loginFields)
        : [...getFieldNames(loginFields), ...getFieldNames(registerFields)],
    );

    dispatch(
      setGlobalLoading({
        visible: true,
      }),
    );

    const mutationOptions = {
      onSuccess: onAuthSuccess,
    };
    const mutationMapper = {
      [EAuthScreen.Login]: loginMutation,
      [EAuthScreen.Register]: registerMutation,
    };

    try {
      await mutationMapper[screen].mutateAsync(input, mutationOptions);
      await refreshGetMe();
      navigate(ROUTES.home);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(
        setGlobalLoading({
          visible: false,
        }),
      );
      event.currentTarget?.reset();
    }
  };

  const isRegisterScreen = screen === EAuthScreen.Register;
  const isLoginScreen = screen === EAuthScreen.Login;

  return {
    isRegisterScreen,
    isLoginScreen,
    onSubmit,
    onChangeGender,
    onChangeScreen,
    formRef,
    screen,
  };
};
