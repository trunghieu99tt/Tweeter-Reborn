import { StyledContainer, StyledFlex } from '@components/shared/shared-style';
import React from 'react';
import styled from 'styled-components';

type Props = {
  sideBar?: JSX.Element | null;
  isFullWidth?: boolean;
  content: JSX.Element;
};

export const OneSideBarLayout = ({ sideBar, content, isFullWidth }: Props) => {
  const element = (
    <StyledFlex gap={2.5}>
      <SideBar>{sideBar}</SideBar>
      <MainContent>{content}</MainContent>
    </StyledFlex>
  );

  if (isFullWidth) return element;

  return <StyledContainer>{element}</StyledContainer>;
};

const SideBar = styled.aside`
  width: 25%;
`;
const MainContent = styled.div`
  flex: 1;
`;
