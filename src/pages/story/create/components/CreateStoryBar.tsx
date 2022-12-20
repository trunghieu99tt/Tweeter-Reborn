import AudienceSelector from '@components/selectors/audience-selector';
import Logo from '@components/shared/logo';
import UserAvatarSmall from '@components/shared/small-avatar';
import { EStoryType } from 'constants/story.constant';
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
    <div>
      <Logo />
      <StyledMain>
        <h2>{t('stories')}</h2>
        <StyledUserInfo>
          <UserAvatarSmall user={user} />
        </StyledUserInfo>
        <StyledStoryConfigWrapper>
          <StyledStoryAudienceWrapper>
            <p>{t('whoCanSeeYourStory')}</p>
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
    </div>
  );
};

export default React.memo(CreateStoryBar);

const StyledMain = styled.div``;

const StyledUserInfo = styled.div``;

const StyledStoryConfigWrapper = styled.div``;

const StyledStoryAudienceWrapper = styled.div``;

const StyledStoryTypeWrapper = styled.div``;

const StyledStoryTypeOption = styled.button``;
