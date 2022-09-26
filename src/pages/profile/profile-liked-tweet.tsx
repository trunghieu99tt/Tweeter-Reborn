import InfinityTweetList from '@components/infinity-lists/infinity-tweet-list';
import { ETweetQuery } from '@constants';
import { useParams } from 'react-router';
import React, { memo } from 'react';

const ProfileLikedTweetPage = () => {
  const { userId } = useParams();

  return (
    <InfinityTweetList
      queryKey={[ETweetQuery.GetLikedTweetByUser, userId].join(',')}
    />
  );
};

export default memo(ProfileLikedTweetPage);
