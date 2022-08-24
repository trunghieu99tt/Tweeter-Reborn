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
  margin: 2.5rem auto;
  display: flex;
  gap: 2.5rem;
  align-items: flex-start;
`;

const LeftSideBar = styled.aside`
  flex: 1;
  max-width: 30rem;
  max-height: 100vh;
  top: 7rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;
const RightSideBar = styled.aside`
  max-height: 100vh;
  position: sticky;
  top: 7rem;
  background: #ffffff;
  box-shadow: var(--box-shadow-1);
  border-radius: 1.2rem;
  max-height: 50rem;
  overflow: auto;
  padding: 2rem;
  width: 30rem;
`;
const MainContent = styled.div`
  width: 50%;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;
