import React from 'react';
import styled, { keyframes } from 'styled-components';

const Loader1 = () => {
  return (
    <React.Fragment>
      <StyledRoot>
        <StyledLoader>
          {[...Array(6)].map((e, idx) => {
            return (
              <StyledLoaderSpan
                key={`loader-span-${idx}`}
                index={idx + 1}
              ></StyledLoaderSpan>
            );
          })}
        </StyledLoader>
        <svg className="w-0 h-0">
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
            ></feGaussianBlur>
            <feColorMatrix
              values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10
                "
            ></feColorMatrix>
          </filter>
        </svg>
      </StyledRoot>
    </React.Fragment>
  );
};

export default Loader1;

const StyledRoot = styled.div`
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.background};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLoader = styled.div`
  transform: translate(-50%, -50%);
  filter: url(#gooey);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  height: 20rem;
`;

const animate = keyframes`
    0% {
        transform: rotate(0);
    }
    50%, 100% {
        transform: rotate(1turn);
    }
`;

const StyledLoaderSpan = styled.span<{
  index: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  animation: ${animate} 3s ease-in-out infinite;
  animation-delay: ${({ index }) => `${index * 200}ms`};

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: calc(50% - 2rem);
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    box-shadow: 0 0 3rem #03a9f4;
    background: linear-gradient(#fce4ec, #03a9f4);
  }
`;
