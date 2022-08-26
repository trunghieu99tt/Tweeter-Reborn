import { EMedia } from '@constants';
import { IMedia } from '@type/app.type';
import React, { memo } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  data: IMedia;
};

const MediaViewer = ({ data }: Props) => {
  let content = null;
  if (data.type === EMedia.Image) {
    content = <StyledImage src={data.url} alt={data.url} loading="lazy" />;
  } else {
    content = <StyledVideo src={data.url} controls muted autoPlay loop />;
  }

  return <StyledRoot>{content}</StyledRoot>;
};

export default memo(MediaViewer);

const sharedStyle = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const StyledRoot = styled.div`
  ${sharedStyle}
`;

const StyledImage = styled.img`
  ${sharedStyle}
`;

const StyledVideo = styled.video`
  ${sharedStyle}
`;
