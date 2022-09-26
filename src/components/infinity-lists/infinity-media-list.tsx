import {
  DEFAULT_LIST_LIMIT,
  ETweetQuery,
  MASONRY_CONFIG_BREAKPOINTS,
} from '@constants';
import { useInfinityList } from '@hooks/useInfinityList';
import MediaCard from '@pages/profile/components/media-card';
import { IMediaWithTweetId } from '@type/app.type';
import { ITweet } from '@type/tweet.type';
import { initMediaFromUrl } from '@utils/helper';
import React, { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import Masonry from 'react-masonry-css';
import { useTweetService } from 'services/tweet.service';
import classes from './infinity-media-list.module.css';

type Props = {
  queryKey: string[];
};

const InfinityMediaList = ({ queryKey }: Props) => {
  const { getMedias, getUserMedias } = useTweetService();
  const mediaIdx = {};

  let queryFunction = null;
  switch (queryKey[0]) {
    case ETweetQuery.GetTweetMedias:
      queryFunction = getMedias(DEFAULT_LIST_LIMIT);
      break;
    case ETweetQuery.GetTweetMediaByUser:
      queryFunction = getUserMedias(DEFAULT_LIST_LIMIT);
  }

  const { data, isLoading, hasMore, fetchNextPage } = useInfinityList<ITweet>({
    queryFunction,
    queryKey,
    queryConfig: {
      limit: DEFAULT_LIST_LIMIT,
    },
  });

  const medias: IMediaWithTweetId[] = useMemo(() => {
    return data.reduce((acc, tweet) => {
      const medias = tweet.media.map((url) => {
        return {
          tweetId: tweet._id,
          ...initMediaFromUrl(url),
        };
      });
      return [...acc, ...medias];
    }, []);
  }, [data]);

  const mediaSkeletons = useMemo(() => {
    return [...Array(6)].map((_, idx: number) => {
      return (
        <Skeleton
          height={Math.floor(Math.random() * 500)}
          key={`tweet-media-skeleton-${idx}`}
          style={{
            marginBottom: '1rem',
          }}
        />
      );
    });
  }, []);

  if (isLoading) {
    return (
      <Masonry
        className={classes.grid}
        columnClassName={classes.column}
        breakpointCols={MASONRY_CONFIG_BREAKPOINTS}
      >
        {mediaSkeletons}
      </Masonry>
    );
  }

  return (
    <InfiniteScroll
      dataLength={medias.length}
      next={fetchNextPage}
      hasMore={hasMore}
      loader={hasMore && <p>Loading...</p>}
    >
      <Masonry
        className={classes.grid}
        columnClassName={classes.column}
        breakpointCols={MASONRY_CONFIG_BREAKPOINTS}
      >
        {medias?.map((tweet: IMediaWithTweetId) => {
          if (!mediaIdx[tweet.tweetId]) {
            mediaIdx[tweet.tweetId] = 0;
          }
          mediaIdx[tweet.tweetId] += 1;
          return (
            <MediaCard
              data={tweet}
              key={`infinity-media-list-${tweet?.tweetId}-${
                mediaIdx[tweet.tweetId]
              }`}
            />
          );
        })}
      </Masonry>
    </InfiniteScroll>
  );
};

export default InfinityMediaList;
