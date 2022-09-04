import MediaViewer from '@components/shared/media-viewer';
import { EMedia } from '@constants';
import { IComment } from '@type/comment.type';
import { calcDiffTimeString } from '@utils/helper';
import { EFontSize, EFontWeight } from 'constants/style.constant';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type Props = {
  data: IComment;
};

const CommentContent = ({ data }: Props) => {
  return (
    <StyledRoot>
      <StyledMeta>
        <StyledAuthorName to={`/profile/${data?.author?._id}`}>
          {data?.author?.name}
        </StyledAuthorName>
        <StyledCreatedAt>
          {calcDiffTimeString(new Date(data?.createdAt))}
        </StyledCreatedAt>
      </StyledMeta>
      <StyledContent>{data?.content}</StyledContent>
      {data?.media && (
        <StyledMediaWrapper>
          <MediaViewer
            data={{
              id: `comment-media-${data._id}`,
              url: data.media,
              type: data.media.includes(EMedia.Image)
                ? EMedia.Image
                : EMedia.Video,
            }}
          />
        </StyledMediaWrapper>
      )}
    </StyledRoot>
  );
};

export default memo(CommentContent);

const StyledRoot = styled.div`
  background: ${({ theme }) => theme.backgroundColor5};
  padding: 1rem 1.5rem;
  border-radius: 0.8rem;

  & > div:first-of-type {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

const StyledMeta = styled.div``;

export const StyledAuthorName = styled(Link)`
  font-size: ${EFontSize.Font4};
  font-weight: ${EFontWeight.FontWeight500};
  color: ${({ theme }) => theme.textColor3};
`;

export const StyledContent = styled.p`
  font-size: ${EFontSize.Font5};
`;

export const StyledCreatedAt = styled.p`
  font-size: ${EFontSize.Font2};
  color: ${({ theme }) => theme.textColor7};
`;

export const StyledMediaWrapper = styled.div`
  height: 15rem;
  max-width: 20rem;
`;
