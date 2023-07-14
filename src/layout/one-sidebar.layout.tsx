import { StyledContainer, StyledFlex } from '@components/shared/shared-style';
import React from 'react';
import styled from 'styled-components';

type Props = {
  sideBar?: JSX.Element | null;
  isFullWidth?: boolean;
  content: JSX.Element;
  customSideBarWidth?: string;
};

export const OneSideBarLayout = ({
  sideBar,
  content,
  isFullWidth,
  customSideBarWidth,
}: Props) => {
  const element = (
    <StyledFlex gap={2.5}>
      <SideBar customSideBarWidth={customSideBarWidth}>{sideBar}</SideBar>
      <MainContent>{content}</MainContent>
    </StyledFlex>
  );

  if (isFullWidth) return element;

  return <StyledContainer>{element}</StyledContainer>;
};

const SideBar = styled.aside<{
  customSideBarWidth?: string;
}>`
  width: ${({ customSideBarWidth }) => customSideBarWidth || '25%'};
`;
const MainContent = styled.div`
  flex: 1;
`;
