import InfinityTweetList from '@components/infinity-lists/infinity-tweet-list';
import PageMetadata from '@components/shared/page-metadata';
import { StyledContainer } from '@components/shared/shared-style';
import { ETweetQuery } from '@constants';
import LayoutWithHeader from '@layout/layout-with-header';
import React from 'react';
import { useTranslation } from 'react-i18next';

const Bookmark = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <PageMetadata title={t('pages.bookmark')} />
      <LayoutWithHeader>
        <StyledContainer>
          <InfinityTweetList queryKey={ETweetQuery.GetBookmarkTweets} />
        </StyledContainer>
      </LayoutWithHeader>
    </React.Fragment>
  );
};

export default Bookmark;
