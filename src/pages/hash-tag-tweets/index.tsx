import InfinityTweetList from '@components/infinity-lists/infinity-tweet-list';
import PageMetadata from '@components/shared/page-metadata';
import { StyledContainer } from '@components/shared/shared-style';
import { ETweetQuery } from '@constants';
import LayoutWithHeader from '@layout/layout-with-header';
import { EFontSize, EFontWeight } from 'constants/style.constant';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import styled from 'styled-components';

const HashtagTweets = () => {
  const { t } = useTranslation();
  const { hashTag } = useParams();

  return (
    <React.Fragment>
      <PageMetadata title={`${t('hashtag')} ${hashTag}`} />
      <LayoutWithHeader>
        <StyledContainer>
          <div>
            <StyledHeading>
              {t('allTweetByHashtag')} {hashTag}
            </StyledHeading>
          </div>
          <InfinityTweetList
            queryKey={`${ETweetQuery.GetTweetByHashTag},${hashTag}`}
          />
        </StyledContainer>
      </LayoutWithHeader>
    </React.Fragment>
  );
};

const StyledHeading = styled.h4`
  margin: 5rem 0;
  font-size: ${EFontSize.Font7};
  text-align: center;

  span {
    color: ${({ theme }) => theme.backgroundColor2};
    font-weight: ${EFontWeight.FontWeight600};
  }
`;

export default HashtagTweets;
