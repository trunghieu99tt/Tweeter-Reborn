import React from 'react';
import styled from 'styled-components';

interface Props {
  data: Record<string, any>;
}

const TextStoryViewer = ({ data }: Props) => {
  const { background, text } = data;

  return (
    <StyledRoot background={background}>
      <StyledText>{text}</StyledText>
    </StyledRoot>
  );
};

export default TextStoryViewer;

const StyledRoot = styled.div<{
  background: string;
}>`
  width: 100%;
  height: 100%;
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: ${(props) => props.background};
`;

const StyledText = styled.div`
  color: #fff;
  font-size: 2rem;
`;
