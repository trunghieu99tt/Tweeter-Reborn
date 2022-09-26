import InfinityTweetList from '@components/infinity-lists/infinity-tweet-list';
import PageMetadata from '@components/shared/page-metadata';
import TweetForm from '@components/tweets/form';
import { EFormType, ETweetQuery } from '@constants';
import LayoutWithHeader from '@layout/layout-with-header';
import { TwoSideBarLayout } from '@layout/two-sidebar.layout';
import NotificationContainer, {
  ENotificationScreen,
} from 'containers/notification/notification.container';
import React from 'react';
import { useTranslation } from 'react-i18next';
import PopularTags from './components/popular-tags/popular-tags';
import StoryList from './components/stories/story-list';

const NewsFeed = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <PageMetadata title={t('page.newsFeed')} />
      <LayoutWithHeader>
        <TwoSideBarLayout
          leftSideBar={
            <NotificationContainer screen={ENotificationScreen.NewFeed} />
          }
          content={
            <React.Fragment>
              <StoryList />
              <TweetForm type={EFormType.Create} />
              <InfinityTweetList queryKey={ETweetQuery.GetLatestTweets} />
            </React.Fragment>
          }
          rightSideBar={
            <React.Fragment>
              <PopularTags />
            </React.Fragment>
          }
        />
      </LayoutWithHeader>
    </React.Fragment>
  );
};

export default NewsFeed;
