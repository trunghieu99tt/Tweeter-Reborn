import TweetItem from '@components/tweets/item';
import TweetSkeleton from '@components/tweets/item/tweet-item.skeleton';
import { ETweetQuery } from '@constants';
import { useInfinityList } from '@hooks/useInfinityList';
import { ITweet } from '@type/tweet.type';
import { EFontWeight } from 'constants/style.constant';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTweetService } from 'services/tweet.service';
import styled from 'styled-components';

type Props = {
  queryKey: string;
};

const DEFAULT_TWEET_LIMIT = 5;

const getEmptyMessage = (queryKey: string) => {
  switch (queryKey) {
    case ETweetQuery.GetLatestTweets:
      return 'No tweets found';
    case ETweetQuery.GetPopularTweets:
      return 'No popular tweets found';
    case ETweetQuery.GetBookmarkTweets:
      return 'No bookmark tweets found';
  }
};

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
      {tweetData?.length === 0 && !isLoading && (
        <StyledEmptyTweetList>{getEmptyMessage(queryKey)}</StyledEmptyTweetList>
      )}
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

const StyledEmptyTweetList = styled.h3`
  text-align: center;
  font-weight: ${EFontWeight.FontWeight600};
  margin-top: 5rem;
`;
