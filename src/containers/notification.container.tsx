import React from 'react';
import NotificationItem from '@components/notification/notification-item';
import NotificationItemSkeleton from '@components/notification/notification-item-skeleton';
import { DEFAULT_LIST_LIMIT, ENotificationQuery } from '@constants';
import {
  flattenInfinityList,
  generateInfinityQueryListConfig,
} from '@utils/query';
import {
  EBorderRadius,
  EFontSize,
  EFontWeight,
} from 'constants/style.constant';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import EventBus, { EventBusName } from 'services/event-bus';
import useNotificationService from 'services/notification.service';
import useUserService from 'services/user.service';
import styled from 'styled-components';

export enum ENotificationScreen {
  NewFeed = 'new-feed',
  Notification = 'notification',
}

type Props = {
  screen: ENotificationScreen;
};

const SMALL_LIST_LIMIT = 5;

const NotificationContainer = ({ screen }: Props) => {
  const { t } = useTranslation();

  const [loading, setIsLoading] = useState<boolean>(false);

  const { getCurrentUser } = useUserService();
  const user = getCurrentUser();

  const { getNotifications, markAsRead } = useNotificationService();

  const {
    data,
    fetchNextPage,
    isLoading: isFetchingGetNotifications,
    isError: isFetchNotificationsError,
  } = useInfiniteQuery(
    ENotificationQuery.GetNotifications,
    getNotifications({
      limit: DEFAULT_LIST_LIMIT,
    }),
    {
      ...generateInfinityQueryListConfig(),
      onError: (error) => {
        EventBus.getInstance().post({
          type: EventBusName.Error,
          error,
        });
      },
    },
  );

  const notifications = flattenInfinityList(data);
  const totalRecords = data?.pages?.[0]?.total || 0;

  const markAllAsRead = async () => {
    const unreadNotificationIds = notifications
      .filter((notification) => {
        return notification?.isRead && !notification.isRead.includes(user?._id);
      })
      .map((notification) => notification._id)
      .filter(Boolean);

    try {
      if (unreadNotificationIds?.length > 0) {
        setIsLoading(true);
        await markAsRead(unreadNotificationIds);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(`${markAllAsRead.name} error`, error);
      if (unreadNotificationIds?.length > 0) {
        setIsLoading(false);
      }
    }
  };

  const isThereAnyUnReadNotification = notifications?.some((notification) => {
    return notification?.isRead && !notification.isRead.includes(user?._id);
  });
  const shouldHaveViewAllButton =
    screen === ENotificationScreen.NewFeed && totalRecords > SMALL_LIST_LIMIT;

  const mainContent = useMemo(() => {
    const isLoading = loading || isFetchingGetNotifications;

    if (isLoading) {
      return [...Array(5)].map((_, idx: number) => (
        <NotificationItemSkeleton key={idx} />
      ));
    }

    const notificationList = notifications?.map((notification) => (
      <NotificationItem data={notification} key={notification._id} />
    ));
    const hasMore = totalRecords > notifications?.length;

    if (screen === ENotificationScreen.NewFeed) {
      return notificationList;
    }

    return (
      <InfiniteScroll
        dataLength={notifications.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
      >
        {notificationList}
      </InfiniteScroll>
    );
  }, [
    screen,
    notifications,
    totalRecords,
    loading,
    isFetchingGetNotifications,
    isFetchNotificationsError,
  ]);

  return (
    <StyledContainer>
      <StyledHeader>
        <StyledHeading>{t('notification')}</StyledHeading>
        {isThereAnyUnReadNotification && (
          <StyledReadAllButton onClick={markAllAsRead}>
            {t('readAll')}
          </StyledReadAllButton>
        )}
      </StyledHeader>
      <StyledMainContent>{mainContent}</StyledMainContent>

      {screen === ENotificationScreen.NewFeed && shouldHaveViewAllButton && (
        <StyledGoToNotificationListPage to={routes.notifications}>
          {t('viewAllNotification')}
        </StyledGoToNotificationListPage>
      )}
    </StyledContainer>
  );
};

export default NotificationContainer;

const StyledContainer = styled.div``;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const StyledHeading = styled.p`
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight500};
`;

const StyledMainContent = styled.div``;

const StyledReadAllButton = styled.button`
  font-size: ${EFontSize.Font2};
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.primaryBackground};
  color: ${({ theme }) => theme.colors.primaryTextColor};
  border-radius: ${EBorderRadius.BorderRadius1};
  font-weight: ${EFontWeight.FontWeight500};
`;

const StyledGoToNotificationListPage = styled(Link)`
  font-size: ${EFontSize.Font2};
`;
