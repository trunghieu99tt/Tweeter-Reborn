import InfinityTweetList from '@components/infinityList/infinity-tweet-list';
import TweetForm from '@components/tweets/tweet-form';
import { EFormType, ETweetQuery } from '@constants';
import LayoutWithHeader from '@layout/layout-with-header';
import { TwoSideBarLayout } from '@layout/two-sidebar.layout';
import NotificationContainer, {
  ENotificationScreen,
} from 'containers/notification/notification.container';
import React from 'react';
import PopularTags from './components/popular-tags/popular-tags';
import StoryList from './components/stories/story-list';

const NewsFeed = () => {
  return (
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
  );
};

export default NewsFeed;
