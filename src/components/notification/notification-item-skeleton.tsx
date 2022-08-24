import { StyledFlex } from '@components/shared/shared-style';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const NotificationItemSkeleton = () => {
  return (
    <StyledFlex>
      <Skeleton width={50} />
      <div>
        <Skeleton height={100}></Skeleton>
        <Skeleton height={50}></Skeleton>
      </div>
    </StyledFlex>
  );
};

export default NotificationItemSkeleton;
