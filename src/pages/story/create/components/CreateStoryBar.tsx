import AudienceSelector from '@components/selectors/audience-selector';
import Logo from '@components/shared/logo';
import UserAvatarSmall from '@components/shared/small-avatar';
import { EStoryType } from 'constants/story.constant';
import { EFontSize } from 'constants/style.constant';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useUserService from 'services/user.service';
import styled from 'styled-components';

type Props = {
  onChangeAudience: (audience: number) => void;
  onChangeStoryType: (type: EStoryType) => void;
};

const CreateStoryBar = ({
  onChangeAudience,
  onChangeStoryType: onChangeStoryTypeProps,
}: Props) => {
  const { t } = useTranslation();

  const { getCurrentUser } = useUserService();
  const user = getCurrentUser();

  const onChangeStoryType = (type: EStoryType) => (event) => {
    onChangeStoryTypeProps(type);
  };

  const storyTypes = [
    {
      value: EStoryType.Media,
      label: t('media'),
    },
    {
      value: EStoryType.Text,
      label: t('text'),
    },
  ];

  return (
    <StyledRoot>
      <Logo />
      <StyledMain>
        <StyledHeading>{t('stories')}</StyledHeading>
        <StyledUserInfo>
          <UserAvatarSmall user={user} />
          <p>{user?.name}</p>
        </StyledUserInfo>
        <StyledStoryConfigWrapper>
          <StyledStoryAudienceWrapper>
            <button>
              <p>{t('story.whoCanSee')}</p>
            </button>
            <AudienceSelector onChange={onChangeAudience} />
          </StyledStoryAudienceWrapper>
          <StyledStoryTypeWrapper>
            <p>{t('storyType')}</p>
            {storyTypes.map((type) => (
              <StyledStoryTypeOption
                key={type.value}
                onClick={onChangeStoryType(type.value)}
              >
                {type.label}
              </StyledStoryTypeOption>
            ))}
          </StyledStoryTypeWrapper>
        </StyledStoryConfigWrapper>
      </StyledMain>
    </StyledRoot>
  );
};

export default React.memo(CreateStoryBar);

const StyledRoot = styled.div`
  height: 100vh;
  overflow: auto;
  background: ${({ theme }) => theme.backgroundColor6};
  padding: 1rem;
`;

const StyledHeading = styled.h2`
  font-size: 2.4rem;
  color: #fff;
`;

const StyledMain = styled.div``;

const StyledUserInfo = styled.div`
  display: flex;
  gap: 1rem;
  algin-items: center;
  margin-bottom: 2rem;

  img {
    border-radius: 50%;
  }

  p {
    font-size: ${EFontSize.Font7};
    color: #fff;
  }
`;

const StyledStoryConfigWrapper = styled.div``;

const StyledStoryAudienceWrapper = styled.div``;

const StyledStoryTypeWrapper = styled.div``;

const StyledStoryTypeOption = styled.button``;
