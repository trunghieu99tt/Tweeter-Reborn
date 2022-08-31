import { StyledFlex } from '@components/shared/shared-style';
import UserAvatarSmall from '@components/shared/small-avatar';
import { BaseControlledRef } from '@type/app.type';
import { IComment } from '@type/comment.type';
import React, { memo, useCallback } from 'react';
import styled from 'styled-components';
import CommentContent from './comment-content';
import CommentInteraction from './comment-interaction';
import CommentReplyForm from './comment-reply-form';

type Props = {
  data: IComment;
};

const CommentItem = ({ data }: Props) => {
  const replyFormRef = React.useRef<BaseControlledRef>(null);

  const onShowReplyForm = useCallback(() => {
    replyFormRef.current?.show();
  }, []);

  return (
    <div>
      <StyledFlex gap={0.5}>
        <UserAvatarSmall user={data?.author} />
        <StyledMain>
          <CommentContent data={data} />
          <CommentInteraction data={data} onShowReplyForm={onShowReplyForm} />
          {data?.replies?.length > 0 &&
            data?.replies.map((reply: IComment) => {
              return (
                <CommentItem data={reply} key={`reply-comment-${reply._id}`} />
              );
            })}
        </StyledMain>
      </StyledFlex>
      <CommentReplyForm data={data} ref={replyFormRef} />
    </div>
  );
};

export default memo(CommentItem);

const StyledMain = styled.div`
  flex: 1;
`;
