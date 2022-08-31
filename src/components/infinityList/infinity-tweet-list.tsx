import TweetItem from '@components/tweets/item';
import TweetSkeleton from '@components/tweets/item/tweet-item.skeleton';
import { DEFAULT_LIST_LIMIT, ETweetQuery } from '@constants';
import { useInfinityList } from '@hooks/useInfinityList';
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

  const {
    data: tweetData,
    isLoading,
    hasMore,
    fetchNextPage,
  } = useInfinityList<ITweet>({
    queryFunction,
    queryKey,
    queryConfig: {
      limit: DEFAULT_LIST_LIMIT,
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
