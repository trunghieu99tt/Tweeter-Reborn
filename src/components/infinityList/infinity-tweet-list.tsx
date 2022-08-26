import TweetItem from '@components/tweets/tweet-item';
import TweetSkeleton from '@components/tweets/tweet-item/tweet-item.skeleton';
import { DEFAULT_LIST_LIMIT, ETweetQuery } from '@constants';
import { ITweet } from '@type/tweet.type';
import {
  flattenInfinityList,
  generateInfinityQueryListConfig,
} from '@utils/query';
import React, { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInfiniteQuery } from 'react-query';
import { useTweetService } from 'services/tweet.service';

type Props = {
  queryKey: ETweetQuery;
};

const InfinityTweetList = ({ queryKey }: Props) => {
  let queryFunction = null;

  const { getLatestTweet } = useTweetService();

  switch (queryKey) {
    case ETweetQuery.GetLatestTweets:
      queryFunction = getLatestTweet(DEFAULT_LIST_LIMIT);
  }

  const query = useInfiniteQuery(
    queryKey,
    queryFunction,
    generateInfinityQueryListConfig(),
  );

  const { data, isLoading, fetchNextPage } = query;
  console.log('data', data);

  const tweetItems = useMemo(() => {
    const tweets = flattenInfinityList<ITweet>(data);
    return tweets?.map((tweet: ITweet) => (
      <TweetItem data={tweet} key={`infinity-tweet-list-${tweet._id}`} />
    ));
  }, [data]);
  const pages = data?.pages;
  const totalRecords = pages?.[0].total || 0;
  const hasMore = tweetItems.length < totalRecords;

  return (
    <React.Fragment>
      {isLoading && tweetItems.length === 0 && <TweetSkeleton />}
      <InfiniteScroll
        dataLength={tweetItems.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={<TweetSkeleton />}
      >
        {tweetItems}
      </InfiniteScroll>
    </React.Fragment>
  );
};

export default InfinityTweetList;
