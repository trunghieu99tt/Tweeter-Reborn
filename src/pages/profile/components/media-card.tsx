import MediaViewer from '@components/shared/media-viewer';
import { IMediaWithTweetId } from '@type/app.type';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  data: IMediaWithTweetId;
};

const MediaCard = ({ data }: Props) => {
  return (
    <StyledWrapper to={`/tweet/${data.tweetId}`}>
      <StyledMediaWrapper>
        <MediaViewer data={data} />
      </StyledMediaWrapper>
    </StyledWrapper>
  );
};

export default memo(MediaCard);

export const StyledWrapper = styled(Link)`
  position: relative;
  margin-bottom: 3rem;
  overflow: hidden;
  cursor: pointer;
`;

export const StyledMediaWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  margin-bottom: 2rem;
`;
