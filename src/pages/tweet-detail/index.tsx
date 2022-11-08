import Loader1 from '@components/shared/loaders/loader-1';
import PageMetadata from '@components/shared/page-metadata';
import { ETweetQuery } from '@constants';
import LayoutWithHeader from '@layout/layout-with-header';
import { SHORT_EXP_TIME } from 'constants/timer.constant';
import { MAX_LENGTH_TWEET_META_TITLE } from 'constants/tweet.constant';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { useTweetService } from 'services/tweet.service';
import styled from 'styled-components';
import TweetItem from '@components/tweets/item';

const TweetDetailPage = () => {
  const { t } = useTranslation();
  const { getTweet } = useTweetService();
  const { tweetId } = useParams();

  const { data, isLoading } = useQuery(
    [ETweetQuery.GetTweet, tweetId],
    getTweet,
    {
      staleTime: SHORT_EXP_TIME,
    },
  );

  if (!isLoading && !data)
    return (
      <React.Fragment>
        <PageMetadata title={t('tweet.not-found')} />
        <TweetNotFound>
          This tweet has been deleted or does not exist
        </TweetNotFound>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <PageMetadata
        title={data?.content?.slice(0, MAX_LENGTH_TWEET_META_TITLE) || ''}
        description={data?.content || ''}
        image={data?.media?.[0] || ''}
      />
      <LayoutWithHeader>
        <Wrapper>
          <TweetItem data={data} isLoading={isLoading} />
        </Wrapper>
      </LayoutWithHeader>
    </React.Fragment>
  );
};

const Wrapper = styled.div`
  max-width: 70rem;
  margin: 0 auto;
  margin-top: 2rem;
`;

const TweetNotFound = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
  font-size: 2rem;
  font-weight: 500;
  color: var(--red);
`;

export default TweetDetailPage;
