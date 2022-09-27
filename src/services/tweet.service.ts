import { EEndpoints, ETweetQuery } from '@constants';
import { QueryFunctionContext, useMutation } from '@tanstack/react-query';
import { ICreateTweetDTO, ITweet } from '@type/tweet.type';
import { tryCatchFn } from '@utils/helper';
import { getList } from '@utils/query';
import client from 'api/client';
import { TweetModel } from 'models/tweet.model';
import { EventBusName, onPushEventBus } from './event-bus';

export const useTweetService = () => {
  const createTweet = async (newTweet: ICreateTweetDTO): Promise<ITweet> => {
    try {
      const response = await client.post(EEndpoints.Tweet, newTweet);
      return new TweetModel(response?.data).getData();
    } catch (error) {
      onPushEventBus({
        type: EventBusName.Error,
        payload: 'tweet.create.error',
      });
      console.error(`${createTweet.name} error`, error);
    }
  };

  const updateTweet = async ({
    tweetId,
    updatedTweet,
  }: {
    tweetId: string;
    updatedTweet: Partial<ICreateTweetDTO>;
  }): Promise<ITweet> => {
    if (!tweetId) {
      onPushEventBus({
        type: EventBusName.Error,
        payload: 'tweet.update.invalidTweetId',
      });

      return;
    }
    try {
      const response = await client.patch(
        `${EEndpoints.Tweet}/${tweetId}`,
        updatedTweet,
      );
      return new TweetModel(response?.data).getData();
    } catch (error) {
      onPushEventBus({
        type: EventBusName.Error,
        payload: 'tweet.update.error',
      });
      console.error(`${updateTweet.name} error`, error);
    }
  };

  const getLatestTweet =
    (limit: number) =>
    ({ pageParam }: QueryFunctionContext) => {
      return getList<ITweet>(`${EEndpoints.Tweet}/latest`, pageParam, {
        limit,
      });
    };

  const getUserTweets =
    (limit: number) =>
    ({ pageParam, queryKey }: QueryFunctionContext) => {
      const userId = queryKey[1];
      const promise = getList<ITweet>(
        `${EEndpoints.Tweet}/user/${userId}`,
        pageParam,
        {
          limit,
        },
      );

      return promise;
    };

  const getUserMedias =
    (limit: number) =>
    ({ pageParam, queryKey }: QueryFunctionContext) => {
      const userId = queryKey[1];
      return getList<ITweet>(
        `${EEndpoints.Tweet}/user-medias/${userId}`,
        pageParam,
        {
          limit,
        },
      );
    };

  const getUserLikedTweets =
    (limit: number) =>
    ({ pageParam, queryKey }: QueryFunctionContext) => {
      const userId = queryKey[1];
      return getList<ITweet>(`${EEndpoints.Tweet}/liked/${userId}`, pageParam, {
        limit,
      });
    };

  const getPopularTweets =
    (limit: number) =>
    ({ pageParam }: QueryFunctionContext) => {
      return getList<ITweet>(`${EEndpoints.Tweet}/popular`, pageParam, {
        limit,
      });
    };

  const getMedias =
    (limit: number) =>
    ({ pageParam }: QueryFunctionContext) => {
      return getList<ITweet>(`${EEndpoints.Tweet}/medias`, pageParam, {
        limit,
      });
    };

  const getSavedTweets =
    (limit: number) =>
    ({ pageParam }: QueryFunctionContext) => {
      return getList<ITweet>(`${EEndpoints.Tweet}/user/saved`, pageParam, {
        limit,
      });
    };

  const reactTweet = async (tweetId: string) =>
    tryCatchFn<ITweet>(async () => {
      const response = await client.post(
        `${EEndpoints.Tweet}/react/${tweetId}`,
      );
      return response?.data;
    }, true);

  const retweet = async (tweetId: string) =>
    tryCatchFn<ITweet>(async () => {
      const response = await client.post(
        `${EEndpoints.Tweet}/retweet/${tweetId}`,
      );
      return response?.data;
    }, true);

  const saveTweet = async (tweetId: string) =>
    tryCatchFn(async () => {
      const response = await client.post(`${EEndpoints.Tweet}/save/${tweetId}`);
      return response?.data;
    }, true);

  const reportTweet = async (tweetId: string) =>
    tryCatchFn(async () => {
      const response = await client.patch(
        `${EEndpoints.Tweet}/report/${tweetId}`,
      );
      return response?.data;
    }, true);

  const createTweetMutation = useMutation(
    [ETweetQuery.CreateTweet],
    createTweet,
  );
  const updateTweetMutation = useMutation(
    [ETweetQuery.UpdateTweet],
    updateTweet,
  );
  const reactTweetMutation = useMutation([ETweetQuery.ReactTweet], reactTweet);
  const retweetMutation = useMutation([ETweetQuery.Retweet], retweet);
  const saveTweetMutation = useMutation([ETweetQuery.SaveTweet], saveTweet);
  const reportTweetMutation = useMutation(
    [ETweetQuery.ReportTweet],
    reportTweet,
  );

  return {
    getMedias,
    getUserTweets,
    getUserMedias,
    getLatestTweet,
    getSavedTweets,
    getPopularTweets,
    getUserLikedTweets,

    createTweetMutation,
    updateTweetMutation,
    reactTweetMutation,
    retweetMutation,
    saveTweetMutation,
    reportTweetMutation,
  };
};
