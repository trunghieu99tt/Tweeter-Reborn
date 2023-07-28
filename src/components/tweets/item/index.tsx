import { ITweet } from '@type/tweet.type';
import { isUUID } from '@utils/helper';
import { EBoxShadow } from 'constants/style.constant';
import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import TweetItemHeader from './tweet-header';
import TweetComments from './tweet-comment';
import TweetContent from './tweet-content';
import TweetInteraction from './tweet-interaction';
import TweetSkeleton from './tweet-item.skeleton';

type Props = {
  data: ITweet;
  isLoading?: boolean;
  style?: CSSProperties;
};

const TweetItem = ({ data, isLoading, style }: Props) => {
  return (
    <StyledRoot style={style}>
      {isLoading && <TweetSkeleton />}
      <TweetItemHeader tweet={data} />
      <div>
        <TweetContent tweet={data} />
        <TweetInteraction tweet={data} />
        {data?._id && !isUUID(data._id) && (
          <TweetComments tweetId={data?._id} />
        )}
      </div>
    </StyledRoot>
  );
};

export default React.memo(TweetItem);

const StyledRoot = styled.article<{
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
