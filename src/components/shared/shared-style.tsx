import styled, { keyframes } from 'styled-components';

export const StyledFlex = styled('div')<{
  gap?: number;
  justify?: string;
  align?: string;
}>`
  display: flex;
  ${({ gap }) => gap && `gap: ${gap}rem`};
  ${({ align }) => align && `align-items: ${align};`}
  ${({ justify }) => justify && `justify-content: ${justify}`};
`;

export const StyledContainer = styled.div`
  width: 100%;
  margin: 2rem auto;

  @media (min-width: 576px) {
    width: 540px;
  }

  @media (min-width: 768px) {
    width: 720px;
  }

  @media (min-width: 992px) {
    width: 960px;
  }

  @media (min-width: 1200px) {
    width: 1140px;
  }
`;

export const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const shake = keyframes`
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(2px);
  }
  50% {
    transform: translateX(0px);
  }
  75%{
    transform: translateX(-2px);
  }
  100% {
    transform: translateX(0);
  }
`;
