import { StyledFlex } from '@components/shared/shared-style';
import Skeleton from 'react-loading-skeleton';
import React from 'react';

const UserCardSkeleton = () => {
  return (
    <div>
      <StyledFlex justify="space-between">
        <StyledFlex gap={1.8}>
          <Skeleton width="10%" height={30} />
          <Skeleton width="90%" height={30} />
        </StyledFlex>
        <Skeleton height={30} width="100%" />
      </StyledFlex>
    </div>
  );
};

export default UserCardSkeleton;
