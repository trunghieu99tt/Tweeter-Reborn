import { ECommentQuery } from '@constants';
import { IMedia } from '@type/app.type';
import {
  EAddCommentType,
  IComment,
  TCreateTweetComment,
  TReplyComment,
} from '@type/comment.type';
import { ITweet } from '@type/tweet.type';
import { initMediaFromFile } from '@utils/helper';
import { IEmojiData } from 'emoji-picker-react';
import _ from 'lodash';
import { CommentModel } from 'models/comment.model';
import { ChangeEvent, useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useCommentService } from 'services/comment.service';
import { EventBusName, onPushEventBus } from 'services/event-bus';
import { useUploadService } from 'services/upload.service';

type Props = {
  tweet: ITweet;
  comment?: IComment;
};

export const useCommentForm = ({ tweet, comment }: Props) => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [media, setMedia] = useState<IMedia | null>(null);

  const { uploadMedia } = useUploadService();
  const { createCommentMutation } = useCommentService();

  const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const onChangeFile = (files: FileList) => {
    const file = files?.[0];
    if (file) {
      setMedia(initMediaFromFile(file));
    }
  };

  const onCancelMedia = () => setMedia(null);

  const resetFields = () => {
    onCancelMedia();
    setContent('');
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    let url = '';
    setLoading(true);
    if (media?.file) {
      url = await uploadMedia(media?.file);
      if (!url) {
        setLoading(false);
        return;
      }
    }
    const newComment = {
      content,
      media: url,
    };

    let input: TCreateTweetComment | TReplyComment;
    if (!!comment) {
      input = {
        type: EAddCommentType.ReplyComment,
        commentId: comment._id,
        comment: newComment,
      };
    } else {
      input = {
        type: EAddCommentType.CreateTweetComment,
        tweetId: tweet._id,
        comment: newComment,
      };
    }

    createCommentMutation.mutate(input, {
      onSettled: () => {
        setLoading(false);
        resetFields();
      },
      onSuccess: (updatedData) => {
        if (updatedData) {
          const updatedComment = new CommentModel(
            updatedData as IComment,
          ).getData();
          queryClient.invalidateQueries([
            ECommentQuery.GetTweetComments,
            tweet._id,
          ]);

          onPushEventBus({
            type: EventBusName.CreateNotification,
            payload: {
              text: !!comment ? 'repliedYourComment' : 'commentedYourTweet',
              receivers: [
                !!comment
                  ? _.pick(updatedComment, ['author', '_id'])
                  : _.pick(updatedComment, ['tweet', 'author', '_id']),
              ],
              url: `/tweet/${_.pick(updatedComment, ['tweet', '_id'])}`,
              type: 'comment',
            },
          });
        }
      },
    });
  };

  const onEmojiClick = useCallback((data: IEmojiData) => {
    setContent((content) => `${content}${data.emoji}`);
  }, []);

  return {
    media,
    loading,
    content,
    onCancelMedia,
    onEmojiClick,
    onChangeContent,
    onChangeFile,
    onSubmit,
  };
};
