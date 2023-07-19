import NotificationItem from '@components/notification/notification-item';
import NotificationItemSkeleton from '@components/notification/notification-item-skeleton';
import { DEFAULT_LIST_LIMIT, ENotificationQuery } from '@constants';
import { INotification } from '@type/notification.type';
import {
  flattenInfinityList,
  generateInfinityQueryListConfig,
} from '@utils/query';
import { EFontSize } from 'constants/style.constant';
import switchRenderIfAuthenticated from 'hoc/switchRenderIfAuthenticated';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import EventBus, { EventBusName } from 'services/event-bus';
import useNotificationService from 'services/notification.service';
import useUserService from 'services/user.service';
import styled from 'styled-components';
import SectionWithHeadingContainer from '../../layout/section-with-heading.layout';
import ReadAllNotificationButton from './read-all-noti-button';

export enum ENotificationScreen {
  NewFeed = 'new-feed',
  Notification = 'notification',
}

type Props = {
  screen: ENotificationScreen;
};

const SMALL_LIST_LIMIT = 5;

const notificationSkeletons = [...Array(5)].map((_, idx: number) => (
  <NotificationItemSkeleton key={idx} />
));

const NotificationContainer = ({ screen }: Props) => {
  const { t } = useTranslation();
  const { getCurrentUser } = useUserService();
  const user = getCurrentUser();
  const { getNotifications } = useNotificationService();

  const {
    data,
    fetchNextPage,
    isLoading: isFetchingGetNotifications,
  } = useInfiniteQuery(
    [ENotificationQuery.GetNotifications],
    getNotifications({
      limit: DEFAULT_LIST_LIMIT,
    }),
    {
      ...generateInfinityQueryListConfig(),
      // set stale time to 5 mins
      staleTime: 5 * 60 * 1000,
      onError: (error) => {
        EventBus.getInstance().post({
          type: EventBusName.Error,
          error,
        });
      },
    },
  );

  const notifications = useMemo(() => {
    return flattenInfinityList<INotification>(data);
  }, [data]);
  const totalRecords = data?.pages?.[0]?.total || 0;
  const isThereAnyUnReadNotification = notifications?.some((notification) => {
    return notification?.isRead && !notification.isRead.includes(user?._id);
  });
  const shouldHaveViewAllButton =
    screen === ENotificationScreen.NewFeed && totalRecords > SMALL_LIST_LIMIT;

  const notificationList = useMemo(() => {
    return notifications?.map((notification) => (
      <NotificationItem
        data={notification}
        key={`notification-item-${notification._id}`}
      />
    ));
  }, [notifications]);

  const hasMore = totalRecords > notifications?.length;

  let mainContent = null;

  if (screen === ENotificationScreen.NewFeed) {
    mainContent = notificationList?.slice(0, SMALL_LIST_LIMIT);
  } else {
    mainContent = (
      <InfiniteScroll
        dataLength={notifications.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
      >
        {notificationList}
      </InfiniteScroll>
    );
  }

  return (
    <SectionWithHeadingContainer
      title={t('notification.index')}
      content={
        <StyledContainer screen={screen}>
          <StyledHeader>
            {isThereAnyUnReadNotification && (
              <ReadAllNotificationButton notifications={notifications} />
            )}
          </StyledHeader>
          <StyledMainContent>
            {isFetchingGetNotifications && notificationSkeletons}
            {mainContent}
          </StyledMainContent>

          {screen === ENotificationScreen.NewFeed &&
            shouldHaveViewAllButton && (
              <StyledGoToNotificationListPage to={ROUTES.notifications}>
                {t('notification.viewAllNotification')}
              </StyledGoToNotificationListPage>
            )}
        </StyledContainer>
      }
    ></SectionWithHeadingContainer>
  );
};

export default switchRenderIfAuthenticated(NotificationContainer, null);

const StyledContainer = styled.div<{
  screen: ENotificationScreen;
}>``;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const StyledMainContent = styled.div``;

const StyledGoToNotificationListPage = styled(Link)`
  font-size: ${EFontSize.Font2};
`;
