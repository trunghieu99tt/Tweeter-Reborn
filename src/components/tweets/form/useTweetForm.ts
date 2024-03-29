import { EMedia, ETweetQuery, EUpdateType } from '@constants';
import { setGlobalLoading } from '@redux/app/app.slice';
import { useQueryClient } from '@tanstack/react-query';
import { IMedia } from '@type/app.type';
import { ICreateTweetDTO, ITweet } from '@type/tweet.type';
import { extractMetadata, initMediaFromUrl } from '@utils/helper';
import _get from 'lodash/get';
import { TweetModel } from 'models/tweet.model';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EventBusName, onPushEventBus } from 'services/event-bus';
import { useHashTagService } from 'services/hash-tag.service';
import { useQueryService } from 'services/query.service';
import { useTweetService } from 'services/tweet.service';
import { useUploadService } from 'services/upload.service';
import useUserService from 'services/user.service';
import { AppDispatch } from 'store';
import { v4 as uuid } from 'uuid';

type Props = {
  tweet?: ITweet;
};

export const useTweetForm = ({ tweet }: Props) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const { createTweetMutation, updateTweetMutation } = useTweetService();
  const { getCurrentUser } = useUserService();
  const { optimisticUpdateInfinityList } = useQueryService();
  const { uploadMedias } = useUploadService();
  const { updateHashTags } = useHashTagService();

  const [body, setBody] = useState(tweet?.content || '');
  const [media, setMedia] = useState<IMedia[]>([]);
  const [initialMedias, setInitialMedias] = useState<IMedia[]>(
    tweet?.media.map(initMediaFromUrl) || [],
  );
  const [audience, setAudience] = useState<number>(tweet?.audience || 0);

  const onChangeFile = useCallback((files: FileList) => {
    if (!files?.length) return;
    const newMedias: IMedia[] = Array.from(files).map((file: File) => ({
      id: uuid(),
      file,
      url: URL.createObjectURL(file),
      type: file.type.split('/')[0].includes('image')
        ? EMedia.Image
        : EMedia.Video,
    }));
    setMedia(newMedias);
  }, []);

  const onResetMedia = useCallback(() => {
    setMedia([]);
    setInitialMedias([]);
  }, []);

  const resetContent = () => {
    setBody('');
  };

  const resetAll = () => {
    onResetMedia();
    setAudience(0);
    resetContent();
    setGlobalLoading(false);
  };

  const onSubmitSuccess = () => {
    const initialHashtags = tweet?.tags || [];
    const { hashtags: newHashtags } = extractMetadata(body || '');
    updateHashTags(initialHashtags, newHashtags);
    resetAll();
    queryClient.invalidateQueries([ETweetQuery.GetLatestTweets]);
  };

  const uploadAndMergeMedias = async (): Promise<IMedia[]> => {
    let newMedia = [...initialMedias];
    if (media?.length > 0) {
      const mediaResponse = await uploadMedias(
        media?.map((media) => media.file) || [],
      );
      if (mediaResponse?.filter(Boolean).length === 0) {
        return;
      }
      newMedia = [...mediaResponse.map(initMediaFromUrl), ...initialMedias];
    }

    return newMedia;
  };

  const onSubmitFailed = (error: any) => {
    resetAll();
    onPushEventBus({
      type: EventBusName.Error,
      payload: _get(error, 'response.data.message', 'Something went wrong!'),
    });
  };

  const onSubmit = async () => {
    if (body || media.length > 0) {
      dispatch(setGlobalLoading(true));
      const newMedia = await uploadAndMergeMedias();
      if (!newMedia) {
        return;
      }

      const { hashtags } = extractMetadata(body || '');
      const newTweet: ICreateTweetDTO = {
        content: body,
        audience,
        media: newMedia.map((media) => media.url),
        tags: hashtags,
      };

      optimisticUpdateInfinityList({
        data: new TweetModel({
          ...newTweet,
          _id: tweet?._id || uuid(),
          author: getCurrentUser(),
          createdAt: new Date(),
          updatedAt: new Date(),
        } as ITweet).getData(),
        queryKey: ETweetQuery.GetLatestTweets,
        type: tweet ? EUpdateType.Update : EUpdateType.Create,
      });

      const options = {
        onSuccess: onSubmitSuccess,
        onError: onSubmitFailed,
        onSettled: () => {
          dispatch(setGlobalLoading(false));
        },
      };

      if (tweet) {
        updateTweetMutation.mutate(
          {
            tweetId: tweet._id,
            updatedTweet: newTweet,
          },
          { ...options },
        );
      } else {
        createTweetMutation.mutate(newTweet, {
          ...options,
        });
      }
    }
  };

  const onChangeAudience = useCallback((value: number) => {
    setAudience(value);
  }, []);

  return {
    body,
    audience,
    media,
    initialMedias,

    setBody,
    onSubmit,
    onChangeFile,
    onResetMedia,
    onChangeAudience,
  };
};
