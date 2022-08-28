import MyEmojiPicker from '@components/shared/emoji-picker';
import FileInput from '@components/shared/file-input';
import Input from '@components/shared/input';
import MediaViewer from '@components/shared/media-viewer';
import UserAvatarSmall from '@components/shared/small-avatar';
import { IComment } from '@type/comment.type';
import { ITweet } from '@type/tweet.type';
import switchRenderIfAuthenticated from 'hoc/switchRenderIfAuthenticated';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ImCancelCircle } from 'react-icons/im';
import { ClipLoader } from 'react-spinners';
import useUserService from 'services/user.service';
import styled from 'styled-components';
import { useCommentForm } from './useCommentForm';

type Props = {
  tweet: ITweet;
  comment?: IComment;
};

const CreateCommentForm = ({ tweet, comment }: Props): JSX.Element => {
  const {
    media,
    content,
    loading,
    onCancelMedia,
    onChangeContent,
    onChangeFile,
    onEmojiClick,
    onSubmit,
  } = useCommentForm({
    tweet,
    comment,
  });
  const { getCurrentUser } = useUserService();
  const user = getCurrentUser();

  const { t } = useTranslation();

  const shouldIndent = !!comment;
  const fileInputId = `comment-file-${comment?._id || tweet?._id}`;

  return (
    <React.Fragment>
      <StyledWrapper onSubmit={onSubmit} shouldIndent={shouldIndent}>
        <UserAvatarSmall user={user} />
        <StyledInputWrapper>
          <Input
            value={content}
            onChange={onChangeContent}
            placeholder={`${t('addAComment')} ...`}
            disabled={loading}
          />
          {loading && <ClipLoader />}
          <MyEmojiPicker onEmojiClick={onEmojiClick} />
          <FileInput htmlFor={fileInputId} onChange={onChangeFile} />
        </StyledInputWrapper>
      </StyledWrapper>
      {media?.url && (
        <StyledCommentImageWrapper>
          <StyledCommentImageCancelButton onClick={onCancelMedia}>
            <ImCancelCircle />
          </StyledCommentImageCancelButton>
          <StyledCommentMedia>
            <MediaViewer data={media} />
          </StyledCommentMedia>
        </StyledCommentImageWrapper>
      )}
    </React.Fragment>
  );
};

export default switchRenderIfAuthenticated(CreateCommentForm, null);

const StyledWrapper = styled('form')<{
  shouldIndent?: boolean;
}>`
  ${(props) =>
    !props.shouldIndent
      ? ''
      : 'transform: translateX(4rem); width: 94%;margin: 1rem 0;'}
  display: flex;
  gap: 1.6rem;
`;

const StyledInputWrapper = styled.div`
  background: #fafafa;
  border: 1px solid #f2f2f2;
  border-radius: 0.8rem;
  flex: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
  gap: 1rem;
`;

const StyledCommentImageWrapper = styled.div`
  position: relative;
  height: 10rem;
  margin-top: 1rem;
`;

const StyledCommentMedia = styled.div`
  height: 10rem;
  max-width: 20rem;
`;

const StyledCommentImageCancelButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;

  svg {
    --size: 1.5rem;
    width: var(--size);
    height: var(--size);
  }
`;
