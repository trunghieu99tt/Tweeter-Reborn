import { ECommentQuery, EEndpoints } from '@constants';
import {
  EAddCommentType,
  ICreateCommentDTO,
  TCreateTweetComment,
  TReplyComment,
} from '@type/comment.type';
import { tryCatchFn } from '@utils/helper';
import { getList } from '@utils/query';
import client from 'api/client';
import { QueryFunctionContext, useMutation } from 'react-query';

type TAddComment = TCreateTweetComment | TReplyComment;

export const useCommentService = () => {
  const createComment = (input: TAddComment) =>
    tryCatchFn(async () => {
      let endpoint = '';
      if (input.type === EAddCommentType.CreateTweetComment)
        endpoint = `${EEndpoints.Comment}/tweet/${input.tweetId}`;
      else {
        endpoint = `${EEndpoints.Comment}/comment/${input.commentId}`;
      }
      const response = await client.post(endpoint, input.comment);
      return response?.data;
    });

  const createCommentMutation = useMutation(
    ECommentQuery.CreateComment,
    createComment,
  );

  const getTweetComments =
    (limit: number) =>
    ({ pageParam }: QueryFunctionContext) => {
      return getList<ICreateCommentDTO>(
        `${EEndpoints.Comment}/tweet`,
        pageParam,
        {
          limit,
        },
      );
    };

  return {
    getTweetComments,
    createCommentMutation,
  };
};
