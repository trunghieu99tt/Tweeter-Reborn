import InfinityMediaList from '@components/infinity-lists/infinity-media-list';
import { ETweetQuery } from '@constants';
import React, { memo } from 'react';
import { useParams } from 'react-router';

const ProfileMediaPage = () => {
  const { userId } = useParams();

  return (
    <InfinityMediaList queryKey={[ETweetQuery.GetTweetMediaByUser, userId]} />
  );
};

export default memo(ProfileMediaPage);
