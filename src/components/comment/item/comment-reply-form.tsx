import { useToggle } from '@hooks/useToggle';
import { BaseControlledRef } from '@type/app.type';
import { IComment } from '@type/comment.type';
import React, { forwardRef, memo, Ref, useImperativeHandle } from 'react';
import styled from 'styled-components';
import CreateCommentForm from '../form/create-comment-form';

type Props = {
  data: IComment;
};

const CommentReplyForm = ({ data }: Props, ref: Ref<BaseControlledRef>) => {
  const { show, hide, visible } = useToggle();
  useImperativeHandle(ref, () => ({ show, hide }), []);

  return (
    <StyledRoot visible={visible}>
      <CreateCommentForm tweet={data.tweet} comment={data} />
    </StyledRoot>
  );
};

export default memo(forwardRef(CommentReplyForm));

const StyledRoot = styled.div<{
  visible: boolean;
}>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;
