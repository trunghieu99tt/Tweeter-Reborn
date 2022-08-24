import { TwoSideBarLayout } from '@layout/two-sidebar.layout';
import NotificationContainer, {
  ENotificationScreen,
} from 'containers/notification.container';
import React from 'react';
import StoryList from './components/stories/story-list';

export const NewsFeed = () => {
  return (
    <TwoSideBarLayout
      leftSideBar={
        <NotificationContainer screen={ENotificationScreen.NewFeed} />
      }
      content={
        <React.Fragment>
          <StoryList />
        </React.Fragment>
      }
    />
  );
};
