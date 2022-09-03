import { BaseControlledRef } from '@type/app.type';
import { ITweet } from '@type/tweet.type';
import { IUser } from '@type/user.type';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTweetService } from 'services/tweet.service';
import useUserService from 'services/user.service';

enum EUserListType {
  Liked = 'liked',
  Saved = 'saved',
  Retweeted = 'retweeted',
}

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
    const initialReacted = [...(tweet?.likes || [])];
    if (!liked) {
      tweet.likes = [...initialReacted, currentUser];
    } else {
      tweet.likes = initialReacted.filter((u) => u._id !== currentUser?._id);
    }

    reactTweetMutation.mutate(tweet._id, {
      onError: (error) => {
        tweet.likes = initialReacted;
      },
    });
  };
  const onSaveTweet = () => {
    // save tweet
    const initialSaved = [...(tweet?.saved || [])];
    if (!saved) {
      tweet.saved = [...initialSaved, currentUser];
    } else {
      tweet.saved = initialSaved.filter((u) => u._id !== currentUser?._id);
    }
    saveTweetMutation.mutate(tweet._id, {
      onError: (error) => {
        tweet.saved = initialSaved;
      },
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
