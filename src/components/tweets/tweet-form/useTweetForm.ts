import { EMedia } from '@constants';
import { setGlobalLoading } from '@redux/app/app.slice';
import { IMedia } from '@type/app.type';
import { ICreateTweetDTO, ITweet } from '@type/tweet.type';
import { extractMetadata, initMedia } from '@utils/helper';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { EventBusName, onPushEventBus } from 'services/event-bus';
import { useHashTagService } from 'services/hash-tag.service';
import { useTweetService } from 'services/tweet.service';
import { useUploadService } from 'services/upload.service';
import { AppDispatch } from 'store';
import { v4 as uuid } from 'uuid';

type Props = {
  tweet?: ITweet;
};

export const useTweetForm = ({ tweet }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const { createTweetMutation, updateTweetMutation } = useTweetService();
  const { uploadMedias } = useUploadService();
  const { updateHashTags } = useHashTagService();

  const [body, setBody] = useState(tweet?.content || '');
  const [media, setMedia] = useState<IMedia[]>([]);
  const [initialMedias, setInitialMedias] = useState<IMedia[]>(
    tweet?.media.map(initMedia) || [],
  );
  const [audience, setAudience] = useState<number>(tweet?.audience || 0);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || [];
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
  };

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
      newMedia = [...mediaResponse.map(initMedia), ...initialMedias];
    }

    return newMedia;
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
