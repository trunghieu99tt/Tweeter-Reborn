import React from 'react';
import { StyledFlex } from '@components/shared/shared-style';
import Skeleton from 'react-loading-skeleton';

const TweetSkeleton = () => {
  return (
    <div>
      <StyledFlex gap={2}>
        <Skeleton height="5rem" width="5rem" />
        <div
          style={{
            flex: 1,
          }}
        >
          <Skeleton height="2rem" />
          <Skeleton height="2rem" />
        </div>
      </StyledFlex>
      <div>
        <Skeleton height="5rem" />
        <Skeleton height="40rem" />
        <Skeleton height="3rem" />
        <Skeleton height="3rem" />
      </div>
      <Skeleton height="5rem" />
      <div>
        {[...Array(3)].map((_, i) => (
          <Skeleton key={`tweet-skeleton-comment-${i}`} height="3rem" />
        ))}
      </div>
    </div>
  );
};

export default TweetSkeleton;
