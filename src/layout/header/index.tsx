import Logo from '@components/shared/logo';
import styled from 'styled-components';
import TopMenu from './top-menu';
import React, { memo } from 'react';
import MyAccount from './my-account-menu';

const Header = () => {
  return (
    <StyledRoot>
      <Logo />
      <TopMenu />
      <MyAccount />
    </StyledRoot>
  );
};

export default memo(Header);

const StyledRoot = styled.header`
  background: #fff;
  padding: 1.5rem 7rem 0 7rem;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 3;
  box-shadow: 0 10px 20px 0 rgb(9 30 66 / 4%), 0 20px 250px 0 rgb(9 30 66 / 4%);

  @media (max-width: 1024px) {
    padding: 1rem 1rem 0 1rem;
  }
`;
