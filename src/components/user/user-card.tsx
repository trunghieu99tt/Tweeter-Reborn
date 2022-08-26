import { StyledFlex } from '@components/shared/shared-style';
import UserAvatarSmall from '@components/shared/small-avatar';
import { IUser } from '@type/user.type';
import { EBoxShadow, EFontSize } from 'constants/style.constant';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import styled from 'styled-components';

interface Props {
  user: IUser;
}

const UserCard = ({ user }: Props) => {
  const { t } = useTranslation();

  const followersCount = user.followers ? user.followers.length : 0;

  return (
    <StyledRoot>
      <StyledFlex justify="space-between">
        <StyledFlex gap={1.8}>
          <UserAvatarSmall user={user} />
          <Link to={`${routes.profile}/${user._id}`}>
            <StyledUserName>{user.name}</StyledUserName>
            <StyledUserFollowers>
              {followersCount}{' '}
              {`${t('follower')}${followersCount > 1 ? 's' : ''}`}
            </StyledUserFollowers>
          </Link>
        </StyledFlex>
      </StyledFlex>
      <StyledUserBio>{user?.bio}</StyledUserBio>
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
