import { EMedia, ETweetQuery, EUpdateType } from '@constants';
import { setGlobalLoading } from '@redux/app/app.slice';
import { IMedia } from '@type/app.type';
import { ICreateTweetDTO, ITweet } from '@type/tweet.type';
import { extractMetadata, initMediaFromUrl } from '@utils/helper';
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
  const dispatch = useDispatch<AppDispatch>();

  const { createTweetMutation, updateTweetMutation } = useTweetService();
  const { getCurrentUser } = useUserService();
  const currentUser = getCurrentUser();
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
    if (files?.length > 0) {
      const newMedias: IMedia[] = Array.from(files).map((file: File) => ({
        id: uuid(),
        file,
        url: URL.createObjectURL(file),
        type: file.type.split('/')[0].includes('image')
          ? EMedia.Image
          : EMedia.Video,
      }));
      setMedia(newMedias);
    }
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
  };

  const uploadAndMergeMedias = async (): Promise<IMedia[]> => {
    let newMedia = [...initialMedias];
    if (media?.length > 0) {
      const mediaResponse = await uploadMedias(
        media?.map((media) => media.file as File) || [],
      );
      if (mediaResponse?.filter(Boolean).length === 0) {
        return;
      }
      newMedia = [...mediaResponse.map(initMediaFromUrl), ...initialMedias];
    }

    return newMedia;
  };

  const onSubmit = async () => {
    console.log('body', body);

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
          _id: uuid(),
          author: getCurrentUser(),
          createdAt: new Date(),
          updatedAt: new Date(),
        } as ITweet).getData(),
        queryKey: ETweetQuery.GetLatestTweets,
        type: tweet ? EUpdateType.Update : EUpdateType.Create,
      });

      try {
        if (tweet) {
          await updateTweetMutation.mutateAsync({
            tweetId: tweet._id,
            updatedTweet: newTweet,
          });
        } else {
          await createTweetMutation.mutateAsync(newTweet);
        }
        onSubmitSuccess();
      } catch (error: any) {
        resetAll();
        onPushEventBus({
          type: EventBusName.Error,
          payload: error?.response?.data?.message,
        });
      }

      dispatch(setGlobalLoading(false));
    }
  };

  return {
    body,
    audience,
    media,
    initialMedias,

    setBody,
    onSubmit,
    setAudience,
    onChangeFile,
    onResetMedia,
  };
};
