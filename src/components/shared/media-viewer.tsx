import { EMedia } from '@constants';
import { useToggle } from '@hooks/useToggle';
import { IMedia } from '@type/app.type';
import React, { memo } from 'react';
import Lightbox from 'react-image-lightbox';
import styled, { css } from 'styled-components';

type Props = {
  data: IMedia;
  hasLightbox?: boolean;
};

const MediaViewer = ({ data, hasLightbox }: Props) => {
  const { show, hide, visible } = useToggle();

  let content = null;
  if (data.type === EMedia.Image) {
    content = (
      <StyledImage
        onClick={show}
        src={data.url}
        alt={data.url}
        loading="lazy"
      />
    );
  } else {
    content = <StyledVideo src={data.url} controls muted autoPlay loop />;
  }

  return (
    <StyledRoot>
      {data.type === EMedia.Image && hasLightbox && visible && (
        <Lightbox mainSrc={data.url} onCloseRequest={hide} />
      )}
      {content}
    </StyledRoot>
  );
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
