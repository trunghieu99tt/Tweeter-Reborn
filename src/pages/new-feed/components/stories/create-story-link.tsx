import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BiBookAdd } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { routes } from 'routes';
import useUserService from 'services/user.service';
import styled from 'styled-components';

const CreateNewStoryLink = () => {
  const { t } = useTranslation();
  const { getCurrentUser } = useUserService();
  const user = getCurrentUser();

  if (!user) return null;

  return (
    <Link to={`${routes.stories}/create`}>
      <StyledImageWrapper>
        <StyledUserAvatar
          src={user?.avatar || ''}
          alt={user?.name}
          loading="lazy"
        />
      </StyledImageWrapper>
      <StyledAddItemPlaceHolder>
        <StyledAddIcon>
          <BiBookAdd />
        </StyledAddIcon>
        <p>{t('createStory')}</p>
      </StyledAddItemPlaceHolder>
    </Link>
  );
};

export default memo(CreateNewStoryLink);

const StyledImageWrapper = styled.figure``;

const StyledUserAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s;
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
