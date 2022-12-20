import ImageWithPlaceholder from '@components/shared/image-with-place-holder';
import { EFontSize, EFontWeight } from 'constants/style.constant';
import switchRenderIfAuthenticated from 'hoc/switchRenderIfAuthenticated';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiBookAdd } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import useUserService from 'services/user.service';
import styled from 'styled-components';

const CreateNewStoryLink = () => {
  const { t } = useTranslation();
  const { getCurrentUser } = useUserService();
  const user = getCurrentUser();

  return (
    <Link to={`${ROUTES.story.create}`}>
      <StyledImageWrapper>
        <ImageWithPlaceholder src={user?.avatar || ''} alt={user?.name} />
      </StyledImageWrapper>
      <StyledAddItemPlaceHolder>
        <StyledAddIcon>
          <BiBookAdd />
        </StyledAddIcon>
        <StyledCreateStoryText>{t('createStory')}</StyledCreateStoryText>
      </StyledAddItemPlaceHolder>
    </Link>
  );
};

export default switchRenderIfAuthenticated(
  React.memo(CreateNewStoryLink),
  null,
);

const StyledImageWrapper = styled.figure`
  width: 100%;
  height: 100%;
`;

const StyledAddItemPlaceHolder = styled.div`
  height: 3rem;
  position: relative;
`;

const StyledAddIcon = styled.div`
  position: absolute;
  top: -2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.backgroundColor1};
  padding: 0.5rem;
  border-radius: 50%;
  color: ${({ theme }) => theme.textColor1};
`;

const StyledCreateStoryText = styled.p`
  font-size: ${EFontSize.Font3};
  color: ${({ theme }) => theme.textColor4};
  text-align: center;
  padding-top: 1rem;
  font-weight: ${EFontWeight.FontWeight600};
  text-transform: capitalize;
`;
