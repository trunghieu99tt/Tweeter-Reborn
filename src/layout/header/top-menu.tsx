import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { routes } from 'routes';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

const TopMenu = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const menu = useMemo(() => {
    return [
      {
        name: t('home'),
        path: '/',
        id: uuid(),
      },
      {
        name: t('explore'),
        path: `${routes.explore}/top`,
        submenus: [
          `${routes.explore}/latest`,
          `${routes.explore}/top`,
          `${routes.explore}/people`,
          `${routes.explore}/media`,
        ],
        id: uuid(),
      },
      {
        name: t('bookmark'),
        path: `${routes.bookmark}`,
        id: uuid(),
      },
      {
        name: t('search'),
        path: `${routes.search}`,
        id: uuid(),
      },
    ];
  }, [t]);

  return (
    <StyledRoot isShown={true}>
      <List>
        {menu?.map((item) => {
          return (
            <Item
              key={`menu-item-${item.id}`}
              active={
                location.pathname === item.path ||
                item?.submenus?.includes(location.pathname) ||
                false
              }
            >
              <Link to={item.path}>{item.name}</Link>
            </Item>
          );
        })}
      </List>
    </StyledRoot>
  );
};

export default TopMenu;

const StyledRoot = styled('div')<{
  isShown: boolean;
}>`
  display: flex;
  gap: 6rem;

  @media (max-width: 769px) {
    position: fixed;
    top: 0;
    left: 0;
    max-width: 300px;
    background: #fff;
    width: 200px;
    height: 100vh;
    z-index: 1;
    display: block;
    padding-top: 3rem;
    ${({ isShown }) => !isShown && `display: none`}
  }

  ${({ isShown }) => !isShown && `display: none`}
`;

const List = styled.div`
  display: flex;
  align-items: center;
  gap: 4.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Item = styled('li')<{
  active: boolean;
}>`
  position: relative;
  padding: 1.5rem;

  ${(props) =>
    props.active &&
    `
        &::after{
            content: ' ';
            position: absolute;
            left: 0;
            bottom: 0;
            height: 3px;
            background: ${({ theme }) => theme.backgroundColor2};
            width: 100%;
            border-radius: 8px 8px 0px 0px;
        }
    `}

  & a {
    color: ${(props) =>
      props.active
        ? `${({ theme }) => theme.backgroundColor2}`
        : 'var(--gray-1)'};
    font-size: 1.4rem;
    font-weight: ${(props) => (props.active ? '600' : '500')};
  }
`;
