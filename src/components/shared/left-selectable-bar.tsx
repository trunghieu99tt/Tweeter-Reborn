import genericMemo from '@hoc/genericMemo';
import { EBoxShadow } from 'constants/style.constant';
import _isEqual from 'lodash/isEqual';
import styled from 'styled-components';
import React from 'react';

export type TLeftSelectableSideBarItem<T> = {
  name: string;
  id: string;
  icon?: JSX.Element;
  value: T;
};

type Props<T> = {
  onChange: (value: T) => void;
  data: TLeftSelectableSideBarItem<T>[];
  defaultValue: T;
};

const LeftSelectableBar = <T,>({
  data,
  defaultValue,
  onChange: propsOnChange,
}: Props<T>) => {
  const [selected, setSelected] = React.useState<T>(defaultValue);

  const onClick = (value: T) => {
    propsOnChange(value);
    setSelected(value);
  };

  return (
    <StyledRoot>
      <StyledList>
        {data.map(
          ({ id, name, icon, value }: TLeftSelectableSideBarItem<T>) => {
            const isActive = _isEqual(value, selected);

            return (
              <StyledListItem
                key={id}
                active={isActive}
                onClick={() => onClick(value)}
              >
                {icon}
                <span>{name}</span>
              </StyledListItem>
            );
          },
        )}
      </StyledList>
    </StyledRoot>
  );
};

export default genericMemo(LeftSelectableBar);

export const StyledRoot = styled.div`
  background: ${({ theme }) => theme.backgroundColor1};
  box-shadow: ${EBoxShadow.BoxShadow1};
  border-radius: 8px;
  padding: 2rem;
  padding-left: 0;

  @media (max-width: 1024px) {
    width: 100%;
    padding: 0;
  }
`;

export const StyledList = styled.div`
  @media (max-width: 1024px) {
    display: flex;
    justify-content: center;
  }
`;

export const StyledListItem = styled('button')<{ active: boolean }>`
  padding: 1rem 2rem;
  position: relative;
  display: block;
  cursor: pointer;
  width: 100%;
  text-align: left;

  ${(props) =>
    props.active &&
    `
        &::before{
            content: ' ';
            position: absolute;
            left: 0;
            top: 0;
            width: 3px;
            background: ${props.theme.backgroundColor2};
            height: 100%;
            border-radius: 0px 8px 8px 0px;
        }
        
        @media (max-width: 1024px) {
            background: ${props.theme.backgroundColor2};
        }
        
        a {
          @media (max-width: 1024px) {
            color: ${props.theme.textColor4} !important;
          }
        }
    `}

  @media (max-width: 1024px) {
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }

  span {
    font-weight: 600;
    font-size: 1.4rem;
    color: ${(props) =>
      props.active
        ? `${props.theme.backgroundColor2}`
        : `${props.theme.textColor6}`};
  }
`;
