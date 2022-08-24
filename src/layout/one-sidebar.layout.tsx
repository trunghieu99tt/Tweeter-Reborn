import React from 'react';
import styled from 'styled-components';

type Props = {
  sideBar?: JSX.Element | null;
  content: JSX.Element;
};

export const OneSideBarLayout = ({ sideBar, content }: Props) => {
  return (
    <Container>
      <SideBar>{sideBar}</SideBar>
      <MainContent>{content}</MainContent>
    </Container>
  );
};

const Container = styled.div``;
const SideBar = styled.aside``;
const MainContent = styled.div``;
