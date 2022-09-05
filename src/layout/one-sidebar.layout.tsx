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

const Container = styled.div`
  max-width: 75%;
  flex: 1;
  margin: 2.5rem auto;
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
`;
const SideBar = styled.aside`
  width: 25%;
`;
const MainContent = styled.div`
  flex: 1;
`;
