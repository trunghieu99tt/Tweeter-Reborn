import { EFontWeight } from 'constants/style.constant';
import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  classes?: any;
  onClick?: (...args: any[]) => void;
  children?: React.ReactNode;
}

const Button = ({ onClick, children, ...rest }: Props): JSX.Element => {
  return (
    <StyledRoot onClick={onClick} {...rest}>
      {children}
    </StyledRoot>
  );
};

export default Button;

const StyledRoot = styled.button`
  padding: 0.8rem 2.4rem;
  background: ${({ theme }) => theme.backgroundColor2};
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-weight: ${EFontWeight.FontWeight500};
  width: 100%;
  text-align: center;
  display: block;

  &:disabled {
    cursor: initial;
    background: var(--gray-4);
  }
`;
