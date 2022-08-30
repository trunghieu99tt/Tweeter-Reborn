import { ITweet } from '@type/tweet.type';
import { EBoxShadow } from 'constants/style.constant';
import React, { CSSProperties, memo } from 'react';
import styled from 'styled-components';
import TweetItemHeader from './tweet-author';
import TweetContent from './tweet-content';
import TweetInteraction from './tweet-interaction';
import TweetSkeleton from './tweet-item.skeleton';

type Props = {
  data: ITweet;
  isLoading?: boolean;
};

const TweetItem = ({ data, isLoading }: Props) => {
  return (
    <StyledRoot>
      {isLoading ? <TweetSkeleton /> : null}
      <TweetItemHeader tweet={data} />
      <div>
        <TweetContent tweet={data} />
        <TweetInteraction tweet={data} />
      </div>
    </StyledRoot>
  );
};

export default memo(TweetItem);

const StyledRoot = styled.article<{
  customStyles?: CSSProperties;
  height?: number;
}>`
  background: ${({ theme }) => theme.backgroundColor1};
  box-shadow: ${EBoxShadow.BoxShadow1};
  border-radius: 0.5rem;
  padding: 2rem;
  margin: 0 auto;
  margin-bottom: 3.5rem;
  max-width: 100%;
`;
