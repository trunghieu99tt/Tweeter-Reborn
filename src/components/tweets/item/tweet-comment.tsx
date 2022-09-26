import CommentItem from '@components/comment/item';
import { ECommentQuery } from '@constants';
import { useInfinityList } from '@hooks/useInfinityList';
import { IComment } from '@type/comment.type';
import { useCommentService } from 'services/comment.service';
import styled from 'styled-components';
import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledFlex } from '@components/shared/shared-style';
import Skeleton from 'react-loading-skeleton';
import switchRenderIfAuthenticated from '@hoc/switchRenderIfAuthenticated';

type Props = {
  tweetId: string;
};

const DEFAULT_COMMENT_LIST_SIZE = 5;

const TweetComments = ({ tweetId }: Props) => {
  const { t } = useTranslation();
  const { getTweetComments } = useCommentService();

  const {
    data: comments,
    hasMore,
    isLoading,
    fetchNextPage,
  } = useInfinityList<IComment>({
    queryKey: [ECommentQuery.GetTweetComments, tweetId],
    queryFunction: getTweetComments(DEFAULT_COMMENT_LIST_SIZE),
    queryConfig: {
      limit: DEFAULT_COMMENT_LIST_SIZE,
    },
  });

  const skeletons = useMemo(() => {
    return [...Array(DEFAULT_COMMENT_LIST_SIZE)].map((_, index) => (
      <TweetCommentSkeleton key={`tweet-comment-skeleton-${index}`} />
    ));
  }, []);

  return (
    <StyledRoot>
      {isLoading && skeletons}
      {comments?.map((comment: IComment) => {
        return <CommentItem data={comment} key={`comment-${comment._id}`} />;
      })}
      {hasMore && (
        <button onClick={() => fetchNextPage()}>{t('button.loadMore')}</button>
      )}
    </StyledRoot>
  );
};

export default switchRenderIfAuthenticated(memo(TweetComments), null);

const TweetCommentSkeleton = () => {
  return (
    <StyledFlex
      gap={1}
      style={{
        marginBottom: '1rem',
      }}
    >
      <Skeleton width="5rem" height="3rem" />
      <Skeleton width="35rem" height="5rem" />
    </StyledFlex>
  );
};

const StyledRoot = styled.div`
  margin-top: 1rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.backgroundColor4};
`;
