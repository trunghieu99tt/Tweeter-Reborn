import InfinityMediaList from '@components/infinity-lists/infinity-media-list';
import InfinityTweetList from '@components/infinity-lists/infinity-tweet-list';
import InfinityUserList from '@components/infinity-lists/infinity-user-list';
import LeftSelectableBar, {
  TLeftSelectableSideBarItem,
} from '@components/shared/left-selectable-bar';
import PageMetadata from '@components/shared/page-metadata';
import { ETweetQuery, EUserQuery } from '@constants';
import LayoutWithHeader from '@layout/layout-with-header';
import { OneSideBarLayout } from '@layout/one-sidebar.layout';
import { queryStringToObject } from '@utils/helper';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { v4 as uuid } from 'uuid';

export enum EExploreScreen {
  PopularUser = 'popular-users',
  LatestTweets = 'latest-tweets',
  LatestMedias = 'latest-medias',
  PopularTweets = 'popular-tweets',
}

const Explore = () => {
  const location = useLocation();
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
      content = <InfinityMediaList queryKey={[ETweetQuery.GetTweetMedias]} />;
      break;
    case EExploreScreen.PopularTweets:
      content = <InfinityTweetList queryKey={ETweetQuery.GetPopularTweets} />;
      break;
    case EExploreScreen.LatestTweets:
      content = <InfinityTweetList queryKey={ETweetQuery.GetLatestTweets} />;
      break;
  }

  const options = useMemo((): TLeftSelectableSideBarItem<EExploreScreen>[] => {
    return [
      {
        id: uuid(),
        name: t('pages.explore.popular-users'),
        value: EExploreScreen.PopularUser,
      },
      {
        id: uuid(),
        name: t('pages.explore.latest-tweets'),
        value: EExploreScreen.LatestTweets,
      },
      {
        id: uuid(),
        name: t('pages.explore.latest-medias'),
        value: EExploreScreen.LatestMedias,
      },
      {
        id: uuid(),
        name: t('pages.explore.popular-tweets'),
        value: EExploreScreen.PopularTweets,
      },
    ];
  }, [t]);

  return (
    <React.Fragment>
      <PageMetadata title={t('pages.explore.index')} />
      <LayoutWithHeader>
        <OneSideBarLayout
          sideBar={
            <LeftSelectableBar<EExploreScreen>
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

export default Explore;
