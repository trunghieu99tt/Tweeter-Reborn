import { StyledFlex } from '@components/shared/shared-style';
import UserAvatarSmall from '@components/shared/small-avatar';
import { IComment } from '@type/comment.type';
import { EFontSize } from 'constants/style.constant';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import classes from './commentSearchResultCard.module.css';
import React, { memo } from 'react';

interface Props {
  data: IComment;
}

const CommentSearchResultCard = ({ data }: Props) => {
  const media = data?.media;
  const isMediaVideo = media?.includes('video');

  return (
    <StyledRoot to={`/tweet/${data?.tweet?._id || 0}`}>
      <StyledHeader>
        <UserAvatarSmall user={data?.author} />
        <p className={classes.authorName}>{data.author.name}</p>
      </StyledHeader>
      <StyledFlex gap={1} align="center">
        <StyledContent className={classes.content}>
          {data?.content?.slice(0, Math.min(data.content.length, 200))}
        </StyledContent>

        <div>
          {media &&
            (isMediaVideo ? (
              <video src={media} controls autoPlay muted />
            ) : (
              <img src={media} alt={`comment media`} loading="lazy" />
            ))}
        </div>
      </StyledFlex>
    </StyledRoot>
  );
};

export default memo(CommentSearchResultCard);

const StyledRoot = styled(Link)`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor1};
  padding: 1rem 2rem;
  display: block;
  color: #000;
  width: 100%;
`;

const StyledHeader = styled.div`
  border-bottom: 1px solid #e1e4e8;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

const StyledContent = styled.p`
  font-size: ${EFontSize.Font4};
`;
