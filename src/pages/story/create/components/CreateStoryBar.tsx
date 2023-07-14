import AudienceSelector from '@components/selectors/audience-selector';
import Button from '@components/shared/button';
import Logo from '@components/shared/logo';
import { StyledFlex } from '@components/shared/shared-style';
import UserAvatarSmall from '@components/shared/small-avatar';
import { EStoryType } from 'constants/story.constant';
import { EFontSize } from 'constants/style.constant';
import React, { useMemo } from 'react';
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

  const storyTypes = useMemo(() => {
    return [
      {
        value: EStoryType.Media,
        label: t('media'),
      },
      {
        value: EStoryType.Text,
        label: t('text'),
      },
    ];
  }, []);

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
          <StyledConfigItemWrapper>
            <StyledSectionTitle>{t('story.whoCanSee')}</StyledSectionTitle>
            <AudienceSelector defaultValue={0} onChange={onChangeAudience} />
          </StyledConfigItemWrapper>
          <StyledConfigItemWrapper>
            <StyledSectionTitle>{t('storyType')}</StyledSectionTitle>
            <StyledFlex gap={1}>
              {storyTypes.map((type) => (
                <Button
                  key={type.value}
                  onClick={onChangeStoryType(type.value)}
                >
                  {type.label}
                </Button>
              ))}
            </StyledFlex>
          </StyledConfigItemWrapper>
        </StyledStoryConfigWrapper>
      </StyledMain>
    </StyledRoot>
  );
};

export default React.memo(CreateStoryBar);

const StyledRoot = styled.div`
  height: 100vh;
  overflow: auto;
  padding: 1rem;
  box-shadow: 5px 1px 5px 0px rgb(0 0 0 / 35%);
`;

const StyledHeading = styled.h2`
  font-size: 2.4rem;
`;

const StyledMain = styled.div``;

const StyledUserInfo = styled.div`
  display: flex;
  gap: 1rem;
  algin-items: center;
  margin: 2rem 0;

  img {
    border-radius: 50%;
  }

  p {
    font-size: ${EFontSize.Font7};
  }
`;

const StyledConfigItemWrapper = styled.div`
  margin: 1.5rem 0;
`;

const StyledSectionTitle = styled.p`
  font-size: ${EFontSize.Font6};
  margin-bottom: 0.5rem;
`;

const StyledStoryConfigWrapper = styled.div``;
