import LeftSelectableBar, {
  TLeftSelectableSideBarItem,
} from '@components/shared/left-selectable-bar';
import PageMetadata from '@components/shared/page-metadata';
import UserOverview from '@components/user/overview/user-overview';
import { EUserQuery, LONG_STATE_TIME } from '@constants';
import LayoutWithHeader from '@layout/layout-with-header';
import { OneSideBarLayout } from '@layout/one-sidebar.layout';
import { IUser } from '@type/user.type';
import { queryStringToObject } from '@utils/helper';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useLocation, useNavigate, useParams } from 'react-router';
import { EventBusName, onPushEventBus } from 'services/event-bus';
import useUserService from 'services/user.service';
import { v4 as uuid } from 'uuid';
import ProfileHomePage from './profile-home';
import ProfileLikedTweetPage from './profile-liked-tweet';
import ProfileMediaPage from './profile-media';

export enum EProfileScreen {
  Home = 'home',
  Liked = 'liked',
  Medias = 'medias',
}

const ProfilePage = () => {
  const { getUser } = useUserService();
  const location = useLocation();
  const params = useParams();
  const userId = params.userId;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { screen } = queryStringToObject(location.search);

  const onChangeScreen = (nextScreen: EProfileScreen) => {
    if (screen !== nextScreen) {
      navigate({
        pathname: location.pathname,
        search: `?screen=${nextScreen}`,
      });
    }
  };

  const { data: userData, isLoading } = useQuery<IUser>(
    [EUserQuery.GetUser, userId],
    getUser,
    {
      staleTime: LONG_STATE_TIME,
      retry: 0,
      onError: (error: any) => {
        onPushEventBus({
          type: EventBusName.Error,
          payload: error?.response?.data?.error,
        });
        navigate('/404');
      },
    },
  );

  let content = null;

  switch (screen) {
    case EProfileScreen.Home:
      content = <ProfileHomePage />;
      break;
    case EProfileScreen.Liked:
      content = <ProfileLikedTweetPage />;
      break;
    case EProfileScreen.Medias:
      content = <ProfileMediaPage />;
  }

  const options = useMemo((): TLeftSelectableSideBarItem<EProfileScreen>[] => {
    return [
      {
        value: EProfileScreen.Home,
        name: t('profile'),
        id: uuid(),
      },
      {
        value: EProfileScreen.Medias,
        name: t('media'),
        id: uuid(),
      },
      {
        value: EProfileScreen.Liked,
        name: t('like'),
        id: uuid(),
      },
    ];
  }, [t]);

  return (
    <React.Fragment>
      <PageMetadata title={`${userData?.name || ''}`} />
      <LayoutWithHeader>
        <UserOverview loading={isLoading} user={userData} />
        <OneSideBarLayout
          sideBar={
            <LeftSelectableBar<EProfileScreen>
              data={options}
              selectedValue={screen}
              onChange={onChangeScreen}
            />
          }
          content={content}
        />
      </LayoutWithHeader>
    </React.Fragment>
  );
};

export default ProfilePage;
