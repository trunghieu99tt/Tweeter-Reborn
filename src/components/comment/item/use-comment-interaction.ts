import { IComment } from '@type/comment.type';
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
    console.log('Go here');

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
      onSuccess: (updatedData: IComment) => {
        if (updatedData?.likes?.includes(currentUser._id)) {
          onPushEventBus({
            type: EventBusName.CreateNotification,
            payload: {
              text: 'likedYourComment',
              receivers: [data.author._id],
              url: `/tweet/${data?.tweet?._id}`,
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
