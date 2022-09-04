import InfinityTweetList from '@components/infinityList/infinity-tweet-list';
import TweetForm from '@components/tweets/form';
import { EFormType, ETweetQuery } from '@constants';
import React, { memo } from 'react';
import { useParams } from 'react-router';
import useUserService from 'services/user.service';

const ProfileHomePage = () => {
  const { getCurrentUser } = useUserService();
  const currentUser = getCurrentUser();

  const { userId } = useParams();
  const isMe = currentUser?._id === userId;

  return (
    <React.Fragment>
      {isMe && <TweetForm type={EFormType.Create} />}
      <InfinityTweetList
        queryKey={[ETweetQuery.GetTweetByUser, userId].join(',')}
      />
    </React.Fragment>
  );
};

export default memo(ProfileHomePage);
