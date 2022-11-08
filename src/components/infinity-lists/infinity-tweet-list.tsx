import TweetItem from '@components/tweets/item';
import TweetSkeleton from '@components/tweets/item/tweet-item.skeleton';
import { ETweetQuery } from '@constants';
import { useInfinityList } from '@hooks/useInfinityList';
import { ITweet } from '@type/tweet.type';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTweetService } from 'services/tweet.service';

type Props = {
  queryKey: string;
};

const DEFAULT_TWEET_LIMIT = 5;

const InfinityTweetList = ({ queryKey }: Props) => {
  let queryFunction = null;

  const {
    getLatestTweet,
    getUserTweets,
    getUserLikedTweets,
    getPopularTweets,
    getSavedTweets,
    getTweetsByHashtag,
  } = useTweetService();

  if (!queryKey.includes(',')) {
    switch (queryKey) {
      case ETweetQuery.GetLatestTweets:
        queryFunction = getLatestTweet(DEFAULT_TWEET_LIMIT);
        break;
      case ETweetQuery.GetPopularTweets:
        queryFunction = getPopularTweets(DEFAULT_TWEET_LIMIT);
        break;
      case ETweetQuery.GetBookmarkTweets:
        queryFunction = getSavedTweets(DEFAULT_TWEET_LIMIT);
        break;
    }
  } else {
    const [key, _] = queryKey.split(',');
    switch (key) {
      case ETweetQuery.GetTweetByUser:
        queryFunction = getUserTweets(DEFAULT_TWEET_LIMIT);
        break;
      case ETweetQuery.GetLikedTweetByUser:
        queryFunction = getUserLikedTweets(DEFAULT_TWEET_LIMIT);
        break;
      case ETweetQuery.GetTweetByHashTag:
        queryFunction = getTweetsByHashtag(DEFAULT_TWEET_LIMIT);
        break;
    }
  }

  const {
    data: tweetData,
    isLoading,
    hasMore,
    fetchNextPage,
  } = useInfinityList<ITweet>({
    queryFunction,
    queryKey: queryKey.includes(',') ? queryKey.split(',') : queryKey,
    queryConfig: {
      limit: DEFAULT_TWEET_LIMIT,
    },
  });

  return (
    <React.Fragment>
      {isLoading && tweetData.length === 0 && <TweetSkeleton />}
      <InfiniteScroll
        dataLength={tweetData.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<TweetSkeleton />}
      >
        {tweetData?.map((tweet: ITweet) => (
          <TweetItem data={tweet} key={`infinity-tweet-list-${tweet._id}`} />
        ))}
      </InfiniteScroll>
    </React.Fragment>
  );
};

export default InfinityTweetList;
