import { StyledContainer, StyledFlex } from '@components/shared/shared-style';
import UpdatableImage from '@components/shared/updatable-image/updatable-image';
import DefaultUnknownAvatar from '@images/user.png';
import { IUser } from '@type/user.type';
import { EBoxShadow, EFontSize, EFontWeight } from 'constants/style.constant';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaBirthdayCake } from 'react-icons/fa';
import { useUploadService } from 'services/upload.service';
import useUserService from 'services/user.service';
import styled from 'styled-components';
import InteractingUserStatistic from './interacting-user-statistic';
import UserActions from './user-actions';
import UserOverviewSkeleton from './user-overview.skeleton';

type Props = {
  user: IUser;
  loading: boolean;
};

const UserOverview = ({ loading, user }: Props) => {
  const { t } = useTranslation();
  const { getCurrentUser, updateUserMutation } = useUserService();
  const currentUser = getCurrentUser();

  const { uploadMedia } = useUploadService();

  const isMe = currentUser?._id === user?._id;

  const onUpdateAvatar = async (file: File): Promise<void> => {
    const newAvatarUrl = await uploadMedia(file);
    await updateUserMutation.mutateAsync({
      updatedUser: {
        avatar: newAvatarUrl,
      },
      userId: user?._id,
    });
  };

  if (loading) return <UserOverviewSkeleton />;

  return (
    <React.Fragment>
      <StyledCoverPhoto img={user?.coverPhoto || ''} />
      <StyledContainer>
        <StyledMain>
          <UpdatableImage
            src={user?.avatar || DefaultUnknownAvatar}
            label={t('updateYourAvatar')}
            updatable={isMe}
            id={`update-user-avatar-${user?._id}`}
            wrapperCustomStyles="margin-top: -7.5rem;"
            onOk={onUpdateAvatar}
          />
          <StyledInfoWrapper>
            <StyledFlex gap={2.5}>
              <StyledName>{user?.name}</StyledName>
              <InteractingUserStatistic user={user} />
            </StyledFlex>
            <div>
              <StyledUsername>@{user?.username}</StyledUsername>
              <StyledBio>{user?.bio}</StyledBio>
              <StyledBirthday>
                <FaBirthdayCake />{' '}
                {user?.birthday && new Date(user.birthday).toLocaleDateString()}
              </StyledBirthday>
            </div>
          </StyledInfoWrapper>

          <UserActions userId={user?._id} />
        </StyledMain>
      </StyledContainer>
    </React.Fragment>
  );
};

export default memo(UserOverview);

const StyledCoverPhoto = styled.div<{
  img: string;
}>`
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: center center;
  height: 35rem;
`;

const StyledMain = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  background: ${({ theme }) => theme.backgroundColor1};
  transform: translateY(-50%);
  padding: 2rem 2.5rem 3.5rem 2.5rem;
  box-shadow: ${EBoxShadow.BoxShadow1};
  border-radius: 12px;
  display: flex;
  gap: 2.5rem;
  min-height: 18rem;

  @media (max-width: 1024px) {
    transform: translateY(0);
    flex-direction: column;
  }

  @media (max-width: 567px) {
    margin: 0 1.5rem;
    align-items: center;
  }
`;

const StyledInfoWrapper = styled.div`
  max-width: 50%;
  @media (max-width: 1024px) {
    max-width: 100%;
  }
`;

export const StyledName = styled.h2`
  font-weight: ${EFontWeight.FontWeight600};
  font-size: 2.4rem;
  line-height: 3.6rem;
  color: ${(props) => props.theme.textColor9};
  letter-spacing: 0.5px;
`;

export const StyledUsername = styled.p`
  color: ${(props) => props.theme.backgroundColor2};
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight500};
  margin-bottom: 1rem;
`;

export const StyledBio = styled.p`
  color: var(--gray-1);
  font-weight: ${EFontWeight.FontWeight500};
  font-size: ${EFontSize.Font6};
  line-height: 2.5rem;
`;

export const StyledBirthday = styled.p`
  font-size: ${EFontSize.Font3};
  color: ${(props) => props.theme.backgroundColor2};
`;
