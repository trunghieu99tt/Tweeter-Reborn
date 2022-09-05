import {
  DEFAULT_LIST_LIMIT,
  ETweetQuery,
  MASONRY_CONFIG_BREAKPOINTS,
} from '@constants';
import { useInfinityList } from '@hooks/useInfinityList';
import { IMediaWithTweetId } from '@type/app.type';
import { initMediaFromUrl } from '@utils/helper';
import React, { memo, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Skeleton from 'react-loading-skeleton';
import Masonry from 'react-masonry-css';
import { useParams } from 'react-router';
import { useTweetService } from 'services/tweet.service';
import MediaCard from './components/media-card';
import classes from './profile-media.module.css';

const ProfileMediaPage = () => {
  const { userId } = useParams();
  const { getUserMedias } = useTweetService();

  const {
    data: tweets,
    hasMore,
    fetchNextPage,
    isLoading,
  } = useInfinityList({
    queryConfig: {
      limit: DEFAULT_LIST_LIMIT,
    },
    queryKey: [ETweetQuery.GetTweetMediaByUser, userId],
    queryFunction: getUserMedias(DEFAULT_LIST_LIMIT),
  });

  const medias: IMediaWithTweetId[] = useMemo(() => {
    return tweets.reduce((acc, tweet) => {
      const medias = tweet.media.map((url) => {
        return {
          tweetId: tweet._id,
          ...initMediaFromUrl(url),
        };
      });
      return [...acc, ...medias];
    }, []);
  }, [tweets]);

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
        {medias?.map((tweet: any) => (
          <MediaCard
            data={tweet}
            key={`infinity-media-list-${tweet?.tweetId}`}
          />
        ))}
      </Masonry>
    </InfiniteScroll>
  );
};

export default memo(ProfileMediaPage);
