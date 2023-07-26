import { StyledFlex } from '@components/shared/shared-style';
import UserAvatarSmall from '@components/shared/small-avatar';
import { ITweet } from '@type/tweet.type';
import { EFontSize, EFontWeight } from 'constants/style.constant';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import React, { memo } from 'react';

interface Props {
  data: ITweet;
}

const TweetSearchResultCard = ({ data }: Props) => {
  const media = data?.media || [];
  const firstMediaUrl = media[0] || '';
  const isFirstMediaVideo = (firstMediaUrl as any)?.includes('video');

  return (
    <StyledRoot to={`/tweet/${data._id}`}>
      <StyledHeader>
        <UserAvatarSmall user={data.author} />
        <p>{data?.author?.name || 'author'}</p>
      </StyledHeader>

      <StyledFlex gap={1} justify="space-between" align="center">
        <StyledContent>
          {data?.content?.slice(0, Math.min(data.content.length, 100))}
        </StyledContent>

        <StyledMedia>
          {media?.length > 0 &&
            (isFirstMediaVideo ? (
              <video src={firstMediaUrl} controls autoPlay muted />
            ) : (
              <img src={firstMediaUrl} alt={`tweet media`} loading="lazy" />
            ))}
        </StyledMedia>
      </StyledFlex>
    </StyledRoot>
  );
};

export default memo(TweetSearchResultCard);

const StyledRoot = styled(Link)`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor1};
  padding: 1rem 2rem;
  display: block;
  color: #000;
  width: 100%;
  margin: 2rem 0;
`;

const StyledHeader = styled.div`
  border-bottom: 1px solid #e1e4e8;
  display: flex;
  align-items: center;
  padding: 1rem 0;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: ${EFontWeight.FontWeight500};
`;

const StyledContent = styled.p`
  font-size: ${EFontSize.Font4};
`;

const StyledMedia = styled.div`
  video,
  img {
    max-width: 100%;
    max-height: 20rem;
  }
`;
