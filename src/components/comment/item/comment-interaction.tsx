import { StyledFlex } from '@components/shared/shared-style';
import { IComment } from '@type/comment.type';
import { EFontSize, EFontWeight } from 'constants/style.constant';
import switchRenderIfAuthenticated from 'hoc/switchRenderIfAuthenticated';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHeart } from 'react-icons/ai';
import styled from 'styled-components';
import { useCommentItem } from './use-comment-interaction';

type Props = {
  data: IComment;
  onShowReplyForm: () => void;
};

const CommentInteraction = ({ data, onShowReplyForm }: Props) => {
  const { t } = useTranslation();

  const { toggleReact, didUserLiked, likedCount } = useCommentItem({ data });

  return (
    <StyledFlex gap={1}>
      <Interaction>
        <LikeButton onClick={toggleReact} liked={didUserLiked}>
          <AiOutlineHeart />
          {didUserLiked ? t('liked') : t('like')}
        </LikeButton>
        {likedCount > 0 && (
          <LikeCounter>
            {likedCount} {likedCount === 1 ? ` ${t('like')}` : ` ${t('like')}`}
          </LikeCounter>
        )}
      </Interaction>
      {!data?.isChild && (
        <ReplyButton onClick={onShowReplyForm}>{t('reply')}</ReplyButton>
      )}
    </StyledFlex>
  );
};

export default switchRenderIfAuthenticated(memo(CommentInteraction), null);

const Interaction = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: ${EFontSize.Font3};
  color: ${({ theme }) => theme.textColor7};
`;

const LikeButton = styled.button<{
  liked?: boolean;
}>`
  cursor: pointer;
  display: flex;
  color: ${({ theme, liked }) =>
    liked ? theme.backgroundColor2 : theme.textColor7};
  align-items: center;
  font-size: ${EFontSize.Font3};
  gap: 0.5rem;
  font-weight: ${({ liked }) =>
    liked ? EFontWeight.FontWeight500 : EFontWeight.FontWeight400};
`;

const ReplyButton = styled(LikeButton)``;

const LikeCounter = styled.div`
  word-spacing: 0.5rem;
`;
