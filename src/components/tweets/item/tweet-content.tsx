import ExternalLinkPreview from '@components/shared/external-link-preview';
import MediaViewer from '@components/shared/media-viewer';
import { ITweet } from '@type/tweet.type';
import {
  extractMetadata,
  initMediaFromUrl,
  stopPropagation,
} from '@utils/helper';
import { EFontSize } from 'constants/style.constant';
import React, { useMemo } from 'react';
import nl2br from 'react-nl2br';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';
import { ROUTES } from 'routes';
import styled from 'styled-components';

type Props = {
  tweet: ITweet;
};

const TweetContent = ({ tweet }: Props) => {
  const renderParsedTweet = () => {
    let replacedText: any = '';

    replacedText = reactStringReplace(
      nl2br(tweet.content),
      /(https?:\/\/\S+)/g,
      (match, i) => {
        return (
          <a
            className="text-primary hover:text-primary_hover"
            key={match + i}
            href={match}
            onClick={stopPropagation}
            target="_blank"
            rel="noopener noreferrer"
          >
            {match}
          </a>
        );
      },
    );
    // Match hashtags
    replacedText = reactStringReplace(replacedText, /#(\w+)/g, (match, i) => (
      <Link
        className="font-bold hover:text-gray-500 transition-colors duration-300"
        key={match + i}
        to={`${ROUTES.hashTags}/${match}`}
        onClick={stopPropagation}
      >
        #{match}
      </Link>
    ));
    return replacedText;
  };

  const { urls } = extractMetadata(tweet?.content || '');

  const tweetMedias = useMemo(() => {
    return tweet?.media?.map((url: string) => {
      const media = initMediaFromUrl(url);

      return (
        <StyledTweetMedia key={media.id}>
          <MediaViewer data={media} />
        </StyledTweetMedia>
      );
    });
  }, [tweet?.media]);

  return (
    <StyledRoot>
      {tweet?.content && (
        <StyledDescription>{renderParsedTweet()}</StyledDescription>
      )}

      {urls && urls?.length > 0 && !tweet?.media?.length && (
        <ExternalLinkPreview url={urls[0]} />
      )}

      {tweet?.media?.length > 0 && (
        <Carousel
          showArrows={false}
          showIndicators={tweet?.media?.length > 1}
          showStatus={tweet?.media?.length > 1}
          showThumbs={false}
        >
          {tweetMedias}
        </Carousel>
      )}
    </StyledRoot>
  );
};

export default TweetContent;

const StyledRoot = styled.div``;

const StyledDescription = styled.div`
  font-size: ${EFontSize.Font6};
  color: ${({ theme }) => theme.textColor3};
  margin-bottom: 2rem;
`;

export const StyledTweetMedia = styled.div`
  height: 40rem;
  object-fit: contain;
  border-radius: 0.8rem;
`;
