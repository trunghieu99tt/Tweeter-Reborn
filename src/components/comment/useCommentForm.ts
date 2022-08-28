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
import { ChangeEvent, useCallback, useState } from 'react';
import { useCommentService } from 'services/comment.service';
import { EventBusName, onPushEventBus } from 'services/event-bus';
import { useUploadService } from 'services/upload.service';

type Props = {
  tweet: ITweet;
  comment?: IComment;
};

export const useCommentForm = ({ tweet, comment }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');
  const [media, setMedia] = useState<IMedia | null>(null);

  const { uploadMedia } = useUploadService();
  const { createCommentMutation } = useCommentService();

  const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    console.log('event.target');
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
      onSuccess: (data) => {
        if (data) {
          onPushEventBus({
            type: EventBusName.CreateNotification,
            payload: {
              text:
                data.type === EAddCommentType.ReplyComment
                  ? 'repliedYourComment'
                  : 'commentedYourTweet',
              receivers: [
                data.type === EAddCommentType.ReplyComment
                  ? data.comment.author.id
                  : data.tweet.author.id,
              ],
              url: `/tweet/${data.tweet._id}`,
              type: 'comment',
            },
          });
        }
      },
    });
  };

  const onEmojiClick = useCallback((data: IEmojiData) => {
    setContent(`${comment}${data.emoji}`);
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
