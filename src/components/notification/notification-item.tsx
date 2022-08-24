import UserAvatarSmall from '@components/shared/small-avatar';
import { INotification } from '@type/notification.type';
import { calcDiffTimeString } from '@utils/helper';
import {
  EBorderRadius,
  EFontSize,
  EFontWeight,
} from 'constants/style.constant';
import _ from 'lodash';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import useNotificationService from 'services/notification.service';
import useUserService from 'services/user.service';
import styled from 'styled-components';

type Props = {
  data: INotification;
};

const NotificationItem = ({ data }: Props) => {
  const { t } = useTranslation();
  const { getCurrentUser } = useUserService();
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { markAsRead } = useNotificationService();

  const onClickItem = () => {
    if (data?._id) {
      navigate(data.url);
    }

    if (data?._id && !data?.isRead?.some((id) => id === user?._id)) {
      markAsRead([data._id]);
    }
  };

  return (
    <StyledRoot
      isUnRead={!data?.isRead?.includes(user?._id)}
      onClick={onClickItem}
    >
      <StyledSenderAvatarWrapper>
        <UserAvatarSmall
          user={_.pick(data?.sender, ['avatar', 'name', 'gender'])}
        />
      </StyledSenderAvatarWrapper>
      <StyledMainContent>
        <StyledContent>
          <strong>{_.get(data, 'sender.name', '')}</strong>{' '}
          {t(data?.text || '')}
        </StyledContent>
        <StyledTime>
          {calcDiffTimeString(data?.createdAt || new Date())}
        </StyledTime>
      </StyledMainContent>
    </StyledRoot>
  );
};

export default memo(NotificationItem);

const StyledRoot = styled.article<{
  isUnRead: boolean;
}>`
  display: flex;
  align-items: center;
  grid-gap: 1.5rem;
  gap: 1.5rem;
  padding: 1rem;
  border-radius: ${EBorderRadius.BorderRadius2};
  margin-bottom: 1.5rem;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
  }

  ${(props) =>
    props.isUnRead && `background-color: ${props.theme.colors.primary};`}
`;

const StyledSenderAvatarWrapper = styled.div``;

const StyledMainContent = styled.div``;

const StyledContent = styled.p`
  font-size: ${EFontSize.Font3};
  color: ${({ theme }) => theme.colors.primaryTextColor};
  text-align: left;
  font-weight: ${EFontWeight.FontWeight400};
`;

const StyledTime = styled.p`
  font-size: ${EFontSize.Font1};
  font-weight: ${EFontWeight.FontWeight500};
  color: var(--green-2);
  text-align: left;
`;
