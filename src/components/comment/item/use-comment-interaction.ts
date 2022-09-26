import { IComment } from '@type/comment.type';
import { CommentModel } from 'models/comment.model';
import React from 'react';
import { useCommentService } from 'services/comment.service';
import { EventBusName, onPushEventBus } from 'services/event-bus';
import useUserService from 'services/user.service';

type Props = {
  data: IComment;
};

export const useCommentItem = ({ data }: Props) => {
  const { reactCommentMutation } = useCommentService();
  const { getCurrentUser } = useUserService();

  const currentUser = getCurrentUser();
  const [visibleReplyForm, setVisibleReplyForm] = React.useState(false);
  const replyFormRef = React.useRef<HTMLFormElement>(null);

  const onShowReplyForm = () => {
    setVisibleReplyForm(true);
    if (replyFormRef?.current) {
      replyFormRef.current.focus();
    }
  };

  const toggleReact = async () => {
    const initialLikes = [...data.likes];
    if (data.likes.includes(currentUser?._id)) {
      data.likes = data.likes.filter((id) => id !== currentUser?._id);
    } else {
      data.likes = [...data.likes, currentUser?._id];
    }

    reactCommentMutation.mutate(data._id, {
      onError: () => {
        data.likes = initialLikes;
      },
      onSuccess: (data: unknown) => {
        const updatedComment = new CommentModel(data as IComment).getData();
        if (updatedComment?.likes?.includes(currentUser._id)) {
          onPushEventBus({
            type: EventBusName.CreateNotification,
            payload: {
              text: 'likedYourComment',
              receivers: [updatedComment.author._id],
              url: `/tweet/${updatedComment?.tweet?._id}`,
              type: 'likedComment',
            },
          });
        }
      },
    });
  };

  const didUserLiked = data.likes?.includes(currentUser?._id);
  const likedCount = data.likes?.length || 0;

  return {
    likedCount,
    didUserLiked,
    visibleReplyForm,
    onShowReplyForm,
    toggleReact,
  };
};
