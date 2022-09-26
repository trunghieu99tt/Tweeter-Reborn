import InfinityTweetList from '@components/infinityList/infinity-tweet-list';
import InfinityUserList from '@components/infinityList/infinity-user-list';
import LeftSelectableBar, {
  TLeftSelectableSideBarItem,
} from '@components/shared/left-selectable-bar';
import PageMetadata from '@components/shared/page-metadata';
import UserOverview from '@components/user/overview/user-overview';
import { ETweetQuery, EUserQuery } from '@constants';
import LayoutWithHeader from '@layout/layout-with-header';
import { OneSideBarLayout } from '@layout/one-sidebar.layout';
import { queryStringToObject } from '@utils/helper';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router';
import { v4 as uuid } from 'uuid';

export enum EExploreScreen {
  PopularUser = 'PopularUser',
  LatestTweets = 'LatestTweets',
  LatestMedias = 'LatestMedias',
  PopularTweets = 'PopularTweets',
}

const Explore = () => {
  const location = useLocation();
  const params = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { screen } = queryStringToObject(location.search);

  const onChangeScreen = (nextScreen: EExploreScreen) => {
    if (screen !== nextScreen) {
      navigate({
        pathname: location.pathname,
        search: `?screen=${nextScreen}`,
      });
    }
  };

  let content = null;

  switch (screen) {
    case EExploreScreen.PopularUser:
      content = <InfinityUserList queryKey={EUserQuery.GetPopularUser} />;
      break;
    case EExploreScreen.LatestMedias:
      content = <InfinityTweetList queryKey={ETweetQuery.GetLatestTweets} />;
      break;
    case EExploreScreen.PopularTweets:
      content = <InfinityTweetList queryKey={ETweetQuery.GetPopularTweets} />;
  }

  return <div>Explore screen</div>;
};

export default Explore;
