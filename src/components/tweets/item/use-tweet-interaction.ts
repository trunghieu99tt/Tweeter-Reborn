import { BaseControlledRef } from '@type/app.type';
import { ITweet } from '@type/tweet.type';
import { IUser } from '@type/user.type';
import { EUserListType } from 'constants/user.constant';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTweetService } from 'services/tweet.service';
import useUserService from 'services/user.service';
import { get as _get, uniqBy as _uniqBy } from 'lodash';
import { UseMutationResult } from '@tanstack/react-query';

type Props = {
  tweet: ITweet;
};

export const useTweetInteraction = ({ tweet }: Props) => {
  const { getCurrentUser } = useUserService();
  const { reactTweetMutation, retweetMutation, saveTweetMutation } =
    useTweetService();
  const currentUser = getCurrentUser();

  const { t } = useTranslation();
  const userListModalRef = useRef<BaseControlledRef>(null);
  const [userListType, setUserListType] = useState<EUserListType>(null);

  let userListData: IUser[] = [];
  let modalUserListHeader = '';
  const usersSavedTweet = _uniqBy(_get(tweet, 'saved', []), '_id');
  const usersLikedTweet = _uniqBy(_get(tweet, 'likes', []), '_id');
  const usersRetweetedTweet = _uniqBy(_get(tweet, 'retweeted', []), '_id');
  const currentUserId = _get(currentUser, '_id', '');
  const retweeted = usersRetweetedTweet.some(
    (user) => user._id === currentUserId,
  );
  const liked = usersLikedTweet.some((user) => user._id === currentUserId);
  const saved = usersSavedTweet.some((user) => user._id === currentUserId);

  switch (userListType) {
    case EUserListType.Liked:
      userListData = usersLikedTweet;
      modalUserListHeader = t('userLikedTweet');
      break;
    case EUserListType.Saved:
      userListData = usersSavedTweet;
      modalUserListHeader = t('userSavedTweet');
      break;
    case EUserListType.Retweeted:
      userListData = usersRetweetedTweet;
      modalUserListHeader = t('userRetweetedTweet');
      break;
  }

  const tweetLikeCount = usersLikedTweet.length;
  const tweetSavedCount = usersSavedTweet.length;
  const tweetRetweetCount = usersRetweetedTweet.length;

  const totalTweetComments = 0;

  const showUserListModal = useCallback(
    (userListType: EUserListType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setUserListType(userListType);
        userListModalRef.current?.show();
      },
    [],
  );

  const onUpdateTweetInteraction = ({
    currentStatus,
    tweetId,
    type,
    mutation,
  }: {
    tweetId: string;
    type: 'likes' | 'retweeted' | 'saved';
    currentStatus: boolean;
    mutation: UseMutationResult<ITweet, unknown, string, unknown>;
  }) => {
    const initialList = _get(tweet, type, []);
    tweet[type] = currentStatus
      ? initialList.filter((u: IUser) => u._id !== currentUser?._id)
      : [...initialList, currentUser];

    mutation.mutate(tweetId, {
      onError: () => {
        tweet[type] = initialList;
      },
    });
  };

  const onRetweet = () => {
    onUpdateTweetInteraction({
      currentStatus: !!retweeted,
      tweetId: tweet._id,
      type: 'retweeted',
      mutation: retweetMutation,
    });
  };

  const onReactTweet = () => {
    onUpdateTweetInteraction({
      currentStatus: !!liked,
      tweetId: tweet._id,
      type: 'likes',
      mutation: reactTweetMutation,
    });
  };

  const onSaveTweet = () => {
    onUpdateTweetInteraction({
      currentStatus: !!saved,
      tweetId: tweet._id,
      type: 'saved',
      mutation: saveTweetMutation,
    });
  };

  return {
    liked,
    saved,
    retweeted,
    userListData,
    tweetLikeCount,
    tweetSavedCount,
    userListModalRef,
    tweetRetweetCount,
    totalTweetComments,
    modalUserListHeader,

    showUserListModal,
    onRetweet,
    onReactTweet,
    onSaveTweet,
  };
};
