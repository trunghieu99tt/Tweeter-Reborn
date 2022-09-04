import { StyledFlex } from '@components/shared/shared-style';
import React, { memo } from 'react';
import Skeleton from 'react-loading-skeleton';

const NotificationItemSkeleton = () => {
  return (
    <StyledFlex
      gap={1}
      style={{
        marginBottom: '1rem',
      }}
    >
      <Skeleton width={50} height={'100%'} />
      <div
        style={{
          flex: 1,
        }}
      >
        <Skeleton height={20} width={'100%'}></Skeleton>
        <Skeleton height={20} width={'100%'}></Skeleton>
      </div>
    </StyledFlex>
  );
};

export default memo(NotificationItemSkeleton);
