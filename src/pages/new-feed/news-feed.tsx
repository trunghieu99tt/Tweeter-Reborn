import React, { useMemo } from 'react';
import { useWindowSize } from '@hooks/useWindowSize';
import { OneSideBarLayout } from '@layout/one-sidebar.layout';
import NotificationContainer, {
  ENotificationScreen,
} from 'containers/notification.container';

export const NewsFeed = () => {
  const windowSize = useWindowSize();

  const sidebar = useMemo(() => {
    if (windowSize && windowSize.width && windowSize.width > 1024) {
      return (
        <React.Fragment>
          <NotificationContainer screen={ENotificationScreen.NewFeed} />
        </React.Fragment>
      );
    }

    return null;
  }, [windowSize]);

  return (
    <OneSideBarLayout sideBar={sidebar} content={<div>Hello world</div>} />
  );
};
