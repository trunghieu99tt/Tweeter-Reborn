import { StyledContainer, StyledFlex } from '@components/shared/shared-style';
import React from 'react';
import styled from 'styled-components';

type Props = {
  sideBar?: JSX.Element | null;
  content: JSX.Element;
};

export const OneSideBarLayout = ({ sideBar, content }: Props) => {
  return (
    <StyledContainer>
      <StyledFlex gap={2.5}>
        <SideBar>{sideBar}</SideBar>
        <MainContent>{content}</MainContent>
      </StyledFlex>
    </StyledContainer>
  );
};

const SideBar = styled.aside`
  width: 25%;
`;
const MainContent = styled.div`
  flex: 1;
`;
