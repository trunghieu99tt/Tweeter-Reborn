import { ITweet } from '@type/tweet.type';
import { EBoxShadow } from 'constants/style.constant';
import React, { memo } from 'react';
import styled from 'styled-components';
import TweetItemHeader from './tweet-author';
import TweetContent from './tweet-content';
import TweetInteraction from './tweet-interaction';

type Props = {
  data: ITweet;
};

const TweetItem = ({ data }: Props) => {
  return (
    <StyledRoot>
      <TweetItemHeader tweet={data} />
      <div>
        <TweetContent tweet={data} />
        <TweetInteraction tweet={data} />
      </div>
    </StyledRoot>
  );
};

export default memo(TweetItem);

const StyledRoot = styled.article`
  background: ${({ theme }) => theme.backgroundColor1};
  box-shadow: ${EBoxShadow.BoxShadow1};
  border-radius: 0.5rem;
  padding: 2rem;
  margin: 0 auto;
  margin-bottom: 3.5rem;
  max-width: 100%;
`;
