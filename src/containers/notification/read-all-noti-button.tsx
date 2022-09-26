import { INotification } from '@type/notification.type';
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

  const markAllAsRead = async () => {
    console.log('mark all as read');
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
      console.error(`markAllAsRead error`, error);
      if (unreadNotificationIds?.length > 0) {
        setIsLoading(false);
      }
    }
  };

  return (
    <StyledReadAllButton onClick={markAllAsRead} disabled={isLoading}>
      {t('readAll')}
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
