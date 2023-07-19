import { INotification } from '@type/notification.type';
import { IUser } from '@type/user.type';
import {
  EBorderRadius,
  EFontSize,
  EFontWeight,
} from 'constants/style.constant';
import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipLoader } from 'react-spinners';
import useNotificationService from 'services/notification.service';
import useUserService from 'services/user.service';
import styled from 'styled-components';

type Props = {
  notifications: INotification[];
};

const ReadAllNotificationButton = ({ notifications }: Props) => {
  const { t } = useTranslation();
  const { markAsRead } = useNotificationService();
  const { getCurrentUser } = useUserService();
  const user = getCurrentUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getUnreadNotificationIds = (
    notifications: INotification[],
    user: IUser,
  ) => {
    return notifications
      .filter((notification) => {
        return notification?.isRead && !notification.isRead.includes(user?._id);
      })
      .map((notification) => notification._id)
      .filter(Boolean);
  };

  const markAllAsRead = async () => {
    const unreadNotificationIds = getUnreadNotificationIds(notifications, user);

    if (unreadNotificationIds?.length) {
      setIsLoading(true);
      try {
        await markAsRead(unreadNotificationIds);
      } catch (error) {
        console.error(`markAllAsRead error`, error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <StyledReadAllButton onClick={markAllAsRead} disabled={isLoading}>
      {t('notification.readAll')}
      {isLoading && <StyledLoader />}
    </StyledReadAllButton>
  );
};

export default memo(ReadAllNotificationButton);

const StyledReadAllButton = styled.button`
  font-size: ${EFontSize.Font2};
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.backgroundColor2};
  color: ${({ theme }) => theme.textColor4};
  border-radius: ${EBorderRadius.BorderRadius1};
  font-weight: ${EFontWeight.FontWeight500};
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const StyledLoader = styled(ClipLoader)`
  --size: 1.5rem;
  width: var(--size) !important;
  height: var(--size) !important;
`;
