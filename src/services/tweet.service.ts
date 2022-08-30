import { EEndpoints, ETweetQuery } from '@constants';
import { ICreateTweetDTO, ITweet } from '@type/tweet.type';
import { getList } from '@utils/query';
import client from 'api/client';
import { TweetModel } from 'models/tweet.model';
import { QueryFunctionContext, useMutation } from 'react-query';
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

  const createTweetMutation = useMutation(ETweetQuery.CreateTweet, createTweet);
  const updateTweetMutation = useMutation(ETweetQuery.UpdateTweet, updateTweet);

  return {
    getLatestTweet,
    createTweetMutation,
    updateTweetMutation,
  };
};
