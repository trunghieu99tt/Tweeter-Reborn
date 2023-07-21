import { useToggle } from '@hooks/useToggle';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

type Props = {};

const MiniChatList = (props: Props) => {
  const { t } = useTranslation();
  const { hide, show, toggle, visible } = useToggle();
  return (
    <StyledRoot>
      <StyledHeading>{t('messages')}</StyledHeading>
    </StyledRoot>
  );
};

export default MiniChatList;

const StyledRoot = styled.div`
  position: fixed;
  width: 28rem;
  padding: 1.5rem;
  z-index: 2;
  bottom: 5rem;
  right: 5rem;
  border-radius: 10px;
`;

const StyledHeading = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2;
  border-bottom: var(--border-1);
`;
