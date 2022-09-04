import React from 'react';
import styled from 'styled-components';

type Props = {
  leftSideBar?: JSX.Element | null;
  rightSideBar?: JSX.Element | null;
  content: JSX.Element;
};

export const TwoSideBarLayout = ({
  leftSideBar,
  content,
  rightSideBar,
}: Props) => {
  return (
    <Container>
      <LeftSideBar>{leftSideBar}</LeftSideBar>
      <MainContent>{content}</MainContent>
      <RightSideBar>{rightSideBar}</RightSideBar>
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

const LeftSideBar = styled.aside`
  width: 30rem;
  max-width: 30rem;
  max-height: 100vh;
  top: 7rem;
  padding: 0 2rem 2rem 2rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;
const RightSideBar = styled.aside`
  max-height: 100vh;
  position: sticky;
  top: 7rem;
  border-radius: 1.2rem;
  overflow: auto;
  padding: 0 2rem 2rem 2rem;

  width: 30rem;
`;
const MainContent = styled.div`
  width: 50%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;
