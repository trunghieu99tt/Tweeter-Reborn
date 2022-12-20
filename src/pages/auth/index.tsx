import GenderSelector from '@components/selectors/gender-selector';
import Button from '@components/shared/button';
import UncontrolledInput from '@components/shared/uncontrolled-input';
import { EFontWeight } from 'constants/style.constant';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { EAuthScreen, loginFields, registerFields, useAuth } from './useAuth';

const Auth = () => {
  const { t } = useTranslation();

  const {
    isLoginScreen,
    isRegisterScreen,
    onChangeGender,
    onChangeScreen,
    onSubmit,
    formRef,
    screen,
  } = useAuth();

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
              <GenderSelector onChange={onChangeGender} />
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
