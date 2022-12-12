import UserAvatarSmall from '@components/shared/small-avatar';
import { INotification } from '@type/notification.type';
import { calcDiffTimeString } from '@utils/helper';
import {
  EBorderRadius,
  EFontSize,
  EFontWeight,
} from 'constants/style.constant';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import _pick from 'lodash/pick';
import React from 'react';
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
          user={_pick(data?.sender, ['avatar', 'name', 'gender', '_id'])}
        />
      </StyledSenderAvatarWrapper>
      <StyledMainContent>
        <StyledContent>
          <strong>{_get(data, 'sender.name', '')}</strong> {t(data?.text || '')}
        </StyledContent>
        <StyledTime>
          {calcDiffTimeString(data?.createdAt || new Date())}
        </StyledTime>
      </StyledMainContent>
    </StyledRoot>
  );
};

export default React.memo(NotificationItem, (prevProps, nextProps) => {
  return _isEqual(prevProps.data, nextProps.data);
});

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
    background-color: ${({ theme }) => theme.backgroundColor4};
  }

  ${(props) =>
    props.isUnRead &&
    `background-color:${({ theme }) => theme.backgroundColor4};`}
`;

const StyledSenderAvatarWrapper = styled.div``;

const StyledMainContent = styled.div``;

const StyledContent = styled.p`
  font-size: ${EFontSize.Font3};
  color: ${({ theme }) => theme.textColor1};
  text-align: left;
  font-weight: ${EFontWeight.FontWeight400};
`;

const StyledTime = styled.p`
  font-size: ${EFontSize.Font1};
  font-weight: ${EFontWeight.FontWeight500};
  color: ${({ theme }) => theme.textColor5};
  text-align: left;
`;
