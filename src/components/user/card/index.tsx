import { StyledFlex } from '@components/shared/shared-style';
import UserAvatarSmall from '@components/shared/small-avatar';
import { EProfileScreen } from '@pages/profile';
import { IUser } from '@type/user.type';
import { EBoxShadow, EFontSize } from 'constants/style.constant';
import React, { CSSProperties, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import styled from 'styled-components';

interface Props {
  data: IUser;
  style?: CSSProperties;
}

const UserCard = ({ data, style }: Props) => {
  const { t } = useTranslation();

  const followersCount = data.followers ? data.followers.length : 0;

  return (
    <StyledRoot style={style}>
      <StyledFlex justify="space-between">
        <StyledFlex gap={1.8}>
          <UserAvatarSmall user={data} />
          <Link
            to={`${ROUTES.profile}/${data._id}?screen=${EProfileScreen.Home}`}
          >
            <StyledUserName>{data.name}</StyledUserName>
            <StyledUserFollowers>
              {followersCount}{' '}
              {`${t('follower')}${followersCount > 1 ? 's' : ''}`}
            </StyledUserFollowers>
          </Link>
        </StyledFlex>
      </StyledFlex>
      <StyledUserBio>{data?.bio}</StyledUserBio>
    </StyledRoot>
  );
};

export default memo(UserCard);

const StyledRoot = styled.article`
  background: ${({ theme }) => theme.backgroundColor1};
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-bottom: ${EBoxShadow.BoxShadow2};
  padding: 2rem;
  box-shadow: ${EBoxShadow.BoxShadow1};
  margin-bottom: 1rem;
  border-radius: 0.8rem;
  min-width: 50rem;
  max-width: 100%;
  height: 17.5rem !important;
`;

const StyledUserName = styled.p`
  font-size: ${EFontSize.Font7};
`;

const StyledUserFollowers = styled.p`
  font-size: ${EFontSize.Font3};
  color: ${({ theme }) => theme.textColor6};
`;

const StyledUserBio = styled.p`
  font-size: ${EFontSize.Font5};
  color: ${({ theme }) => theme.textColor6};
`;
