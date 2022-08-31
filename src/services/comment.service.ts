import { ECommentQuery, EEndpoints } from '@constants';
import {
  EAddCommentType,
  IComment,
  TCreateTweetComment,
  TReplyComment,
} from '@type/comment.type';
import { tryCatchFn } from '@utils/helper';
import { getList } from '@utils/query';
import client from 'api/client';
import { CommentModel } from 'models/comment.model';
import { QueryFunctionContext, useMutation } from 'react-query';

type TAddComment = TCreateTweetComment | TReplyComment;

export const useCommentService = () => {
  const createComment = (input: TAddComment) =>
    tryCatchFn(async () => {
      const response = await client.post(
        `${EEndpoints.Comment}/${
          input.type === EAddCommentType.CreateTweetComment
            ? input.tweetId
            : input.commentId
        }`,
        input.comment,
      );
      return new CommentModel(response?.data).getData();
    }, true);

  const reactTweet = (id: string) =>
    tryCatchFn(async () => {
      const response = await client.patch(`${EEndpoints.Comment}/${id}/react`);
      return new CommentModel(response?.data).getData();
    }, true);

  const createCommentMutation = useMutation(
    ECommentQuery.CreateComment,
    createComment,
  );
  const reactCommentMutation = useMutation(
    ECommentQuery.ReactComment,
    reactTweet,
  );

  const getTweetComments =
    (limit: number) =>
    ({ pageParam, queryKey }: QueryFunctionContext) => {
      const tweetId = queryKey[1];
      return getList<IComment>(`${EEndpoints.Comment}/${tweetId}`, pageParam, {
        limit,
      });
    };

  return {
    getTweetComments,
    reactCommentMutation,
    createCommentMutation,
  };
};
