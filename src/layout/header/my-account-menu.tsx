import BaseSelector from '@components/shared/base-selector';
import Button from '@components/shared/button';
import { StyledFlex } from '@components/shared/shared-style';
import UserAvatarSmall from '@components/shared/small-avatar';
import { ELocalStorageKey } from '@constants';
import { useLocalStorage } from '@hooks/useLocalStorage';
import { EProfileScreen } from '@pages/profile';
import { setGlobalLoading } from '@redux/app/app.slice';
import { EFontSize, EFontWeight } from 'constants/style.constant';
import switchRenderIfAuthenticated from 'hoc/switchRenderIfAuthenticated';
import React, { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GrNotification } from 'react-icons/gr';
import { RiAccountCircleFill, RiLogoutBoxRLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes';
import { useAuthService } from 'services/auth.service';
import { EventBusName, onPushEventBus } from 'services/event-bus';
import useUserService from 'services/user.service';
import { AppDispatch } from 'store';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

enum EMyAccountMenuOptions {
  Profile = 'profile',
  Notifications = 'notifications',
  Logout = 'logout',
}

const MyAccountMenu = () => {
  const { t } = useTranslation();

  const { logoutMutation, refreshGetMe } = useAuthService();
  const { getCurrentUser } = useUserService();
  const user = getCurrentUser();

  const navigate = useNavigate();
  const [_, setAccessToken] = useLocalStorage(ELocalStorageKey.AccessToken, '');
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = async () => {
    dispatch(
      setGlobalLoading({
        visible: true,
      }),
    );
    try {
      await logoutMutation.mutateAsync();
      setAccessToken('');
      navigate(ROUTES.auth);
      await refreshGetMe();
    } catch (error) {
      onPushEventBus({
        type: EventBusName.Error,
        payload: 'auth.logout.error',
      });
    }

    dispatch(
      setGlobalLoading({
        visible: false,
      }),
    );
  };

  const onChange = async (value: EMyAccountMenuOptions) => {
    switch (value) {
      case EMyAccountMenuOptions.Logout:
        await onLogout();
        break;
      case EMyAccountMenuOptions.Notifications:
        navigate(ROUTES.notifications);
        break;
      case EMyAccountMenuOptions.Profile:
        navigate(
          `${ROUTES.profile}/${user?._id}?screen=${EProfileScreen.Home}`,
        );
        break;
    }
  };

  const options = useMemo(() => {
    return [
      {
        value: EMyAccountMenuOptions.Profile,
        label: t('profile'),
        id: uuid(),
        icon: <RiAccountCircleFill />,
      },
      {
        value: EMyAccountMenuOptions.Notifications,
        label: t('notifications'),
        id: uuid(),
        icon: <GrNotification />,
      },
      {
        value: EMyAccountMenuOptions.Logout,
        label: t('logout'),
        id: uuid(),
        icon: <RiLogoutBoxRLine />,
      },
    ];
  }, [t]);

  const renderValue = useCallback(() => {
    return (
      <React.Fragment>
        <UserAvatarSmall user={user} />
        <StyledAvatarCaption>{user?.name}</StyledAvatarCaption>
      </React.Fragment>
    );
  }, [user]);

  return (
    <StyledRoot>
      <StyledFlex align="center" gap={1}>
        <BaseSelector<EMyAccountMenuOptions>
          onChange={onChange}
          options={options}
          renderValue={renderValue}
        />
      </StyledFlex>
    </StyledRoot>
  );
};

const LoginButton = () => {
  return (
    <Link to={ROUTES.auth}>
      <Button>Login</Button>
    </Link>
  );
};

export default switchRenderIfAuthenticated(MyAccountMenu, LoginButton);

const StyledRoot = styled.div`
  position: relative;
`;

const StyledAvatarCaption = styled.div`
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight600};
`;
