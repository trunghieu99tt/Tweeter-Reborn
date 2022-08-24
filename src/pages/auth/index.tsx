import GenderSelector from '@components/selectors/gender-selector';
import Button from '@components/shared/button';
import UncontrolledInput from '@components/shared/uncontrolled-input';
import { ELocalStorageKey, EUserQuery } from '@constants';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { setLoading } from '@redux/app/app.slice';
import { setUser } from '@redux/user/user.slice';
import { ILogin } from '@type/user.type';
import { EFontWeight } from 'constants/style.constant';
import { EGender } from 'constants/user.constant';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiLock, BiMailSend, BiUserCircle, BiUserPin } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { useAuthService } from 'services/auth.service';
import { AppDispatch } from 'store';
import styled from 'styled-components';
import _ from 'lodash';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { routes } from 'routes';

enum EAuthScreen {
  Login = 'login',
  Register = 'register',
}

type TInputField = {
  label: string;
  name: string;
  icon: JSX.Element;
  type: string;
};

const loginFields: TInputField[] = [
  {
    label: 'username',
    name: 'username',
    icon: <BiUserCircle />,
    type: 'text',
  },
  {
    label: 'password',
    name: 'password',
    icon: <BiLock />,
    type: 'password',
  },
];
const registerFields: TInputField[] = [
  {
    name: 'passwordConfirm',
    label: 'Confirm Password',
    icon: <BiLock />,
    type: 'text',
  },
  {
    label: 'Name',
    name: 'name',
    icon: <BiUserPin />,
    type: 'text',
  },
  {
    label: 'Email',
    name: 'email',
    icon: <BiMailSend />,
    type: 'text',
  },
];

const getFieldNames = (fields: TInputField[]) => fields.map(({ name }) => name);

const Auth = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [screen, setScreen] = useState<EAuthScreen>(EAuthScreen.Login);
  const [gender, setGender] = useState<EGender>(EGender.UNKNOWN);
  const { loginMutation, registerMutation } = useAuthService();
  const formRef = React.useRef<HTMLFormElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [storedAccessToken, setAccessToken] = useLocalStorage(
    ELocalStorageKey.AccessToken,
    '',
  );

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
      setLoading({
        visible: true,
      }),
    );
    try {
      if (screen === EAuthScreen.Login) {
        await loginMutation.mutateAsync(input as unknown as ILogin, {
          onSuccess: (data) => {
            queryClient.invalidateQueries(EUserQuery.GetMe);
            setAccessToken(data.accessToken);
          },
          onSettled: () => {
            dispatch(
              setLoading({
                visible: false,
              }),
            );
          },
        });
      } else {
        await registerMutation.mutateAsync(input, {
          onSettled: () => {
            dispatch(
              setLoading({
                visible: false,
              }),
            );
          },
        });
      }
    } catch (error) {
      console.log(error);
      dispatch(
        setLoading({
          visible: false,
        }),
      );
    }
    event.currentTarget?.reset();
  };

  const isRegisterScreen = screen === EAuthScreen.Register;
  const isLoginScreen = screen === EAuthScreen.Login;

  return (
    <React.Fragment>
      <StyledRoot>
        <StyledMain>
          <StyledHeader>
            <StyledHeading>{t('authenticationGreeting')}</StyledHeading>
            <StyledSubHeading>
              {isLoginScreen ? t('dontHaveAnAccount') : t('doYouHaveAnAccount')}
              <StyledSwitchScreenButton
                onClick={onChangeScreen(
                  isLoginScreen ? EAuthScreen.Register : EAuthScreen.Login,
                )}
              >
                {isLoginScreen ? t('registerHere') : t('loginHere')}
              </StyledSwitchScreenButton>
            </StyledSubHeading>
          </StyledHeader>
          <form onSubmit={onSubmit} ref={formRef}>
            {loginFields?.map((field) => (
              <UncontrolledInput {...field} key={field.name} required />
            ))}
            <StyledRegisterFields isHidden={screen === EAuthScreen.Login}>
              {registerFields.map((field) => (
                <UncontrolledInput
                  {...field}
                  key={field.name}
                  required={isRegisterScreen}
                />
              ))}
              <GenderSelector value={gender} onChange={onChangeGender} />
            </StyledRegisterFields>

            <Button type="submit">
              {screen === EAuthScreen.Login ? 'Login' : 'Register'}
            </Button>
          </form>
        </StyledMain>
      </StyledRoot>
    </React.Fragment>
  );
};

export default Auth;

const StyledRoot = styled.div`
  background: ${({ theme }) => theme.backgroundColor1};
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledHeader = styled.div`
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.backgroundColor1};
`;

const StyledHeading = styled.h2`
  font-weight: bold;
  text-align: center;
`;

export const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  border-radius: 0.8rem;
  overflow: auto;
  box-shadow: 0px 0px 10px rgb(0 0 0 / 10%);
  padding: 3rem;
  min-width: 50rem;
`;

const StyledSubHeading = styled.p`
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textColor3};
`;

const StyledSwitchScreenButton = styled.button`
  font-weight: ${EFontWeight.FontWeight500};
  color: ${({ theme }) => theme.textColor2};
`;

const StyledRegisterFields = styled.div<{ isHidden: boolean }>`
  display: ${(props) => (props.isHidden ? 'none' : 'block')};
`;
