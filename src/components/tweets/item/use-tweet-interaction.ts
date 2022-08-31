import { BaseControlledRef } from '@type/app.type';
import { ITweet } from '@type/tweet.type';
import { IUser } from '@type/user.type';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueryService } from 'services/query.service';
import { useTweetService } from 'services/tweet.service';
import useUserService from 'services/user.service';

enum EUserListType {
  Liked = 'liked',
  Saved = 'saved',
  Retweeted = 'retweeted',
}

enum EInteractionButton {
  Like = 'like',
  Save = 'save',
  Comment = 'comment',
  Share = 'share',
}

type Props = {
  tweet: ITweet;
};

const useTweetInteraction = ({ tweet }: Props) => {
  const { getCurrentUser } = useUserService();
  const { optimisticUpdateInfinityList } = useQueryService();
  const { reactTweetMutation, retweetMutation, saveTweetMutation } =
    useTweetService();
  const currentUser = getCurrentUser();

  const { t } = useTranslation();
  const userListModalRef = useRef<BaseControlledRef>(null);
  const [userListType, setUserListType] = useState<EUserListType>(null);

  let userListData: IUser[] = [];
  let modalUserListHeader = '';

  switch (userListType) {
    case EUserListType.Liked:
      userListData = tweet?.likes || [];
      modalUserListHeader = t('userLikedTweet');
      break;
    case EUserListType.Saved:
      userListData = tweet?.saved || [];
      modalUserListHeader = t('userSavedTweet');
      break;
    case EUserListType.Retweeted:
      userListData = tweet?.retweeted || [];
      modalUserListHeader = t('userRetweetedTweet');
      break;
  }

  const tweetLikeCount = tweet?.likes?.length || 0;
  const tweetSavedCount = tweet?.saved?.length || 0;
  const tweetRetweetCount = tweet?.retweeted?.length || 0;
  const totalTweetComments = 0;
  const retweeted =
    (currentUser?._id &&
      tweet?.retweeted?.findIndex((u: IUser) => u._id === currentUser?._id) !==
        -1) ||
    false;

  const liked =
    (currentUser?._id &&
      tweet?.likes.findIndex((u: IUser) => u?._id === currentUser?._id) !==
        -1) ||
    false;

  // current user saved this tweet or not
  const saved =
    (currentUser?._id &&
      tweet?.saved?.findIndex((u: IUser) => u?._id === currentUser?._id) !==
        -1) ||
    false;

  const showUserListModal = useCallback(
    (userListType: EUserListType) =>
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setUserListType(userListType);
        userListModalRef.current?.show();
      },
    [],
  );

  const onRetweet = () => {
    // retweet tweet
    const initialRetweeted = [...(tweet?.retweeted || [])];
    if (!retweeted) {
      tweet.retweeted = [...initialRetweeted, currentUser];
    } else {
      tweet.retweeted = initialRetweeted.filter(
        (u) => u._id !== currentUser?._id,
      );
    }

    retweetMutation.mutate(tweet._id, {
      onError: (error) => {
        tweet.retweeted = initialRetweeted;
      },
    });
  };
  const onReactTweet = () => {
    // react to tweet
  };
  const onSaveTweet = () => {
    // save tweet
  };

  return {
    retweeted,
    liked,
    saved,
    userListData,
    tweetLikeCount,
    tweetSavedCount,
    tweetRetweetCount,
    totalTweetComments,
    modalUserListHeader,

    showUserListModal,
    onRetweet,
    onReactTweet,
    onSaveTweet,
  };
};
