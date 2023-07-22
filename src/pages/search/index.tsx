import Loading from '@components/shared/loading/loading';
import PageMetadata from '@components/shared/page-metadata';
import { StyledContainer, StyledFlex } from '@components/shared/shared-style';
import LayoutWithHeader from '@layout/layout-with-header';
import { IHashtag } from '@type/hash-tag.type';
import { ITweet } from '@type/tweet.type';
import { IUser } from '@type/user.type';
import { EBoxShadow, EFontSize, EFontWeight } from 'constants/style.constant';
import React, { lazy, Suspense, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineFileSearch } from 'react-icons/ai';
import styled from 'styled-components';
import { ESearchType, useSearch } from './useSearch';

const HashTagResult = lazy(() => import('./components/hashtag-result-card'));
const TweetResult = lazy(() => import('./components/tweet-result-card'));
const UserCard = lazy(() => import('@components/user/card'));

const SearchPage = () => {
  const { t } = useTranslation();

  const { query, loading, onChange, onSubmit, response } = useSearch();

  const resultContent = useMemo(() => {
    if (!response) return null;
    switch (response.type) {
      case ESearchType.Tweet:
        return response?.data?.map((tweet: ITweet) => (
          <Suspense
            fallback={<div>Loading...</div>}
            key={`tweet-result-${tweet._id}`}
          >
            <TweetResult data={tweet} />
          </Suspense>
        ));
      case ESearchType.Hashtag:
        return response?.data?.map((hashtag: IHashtag) => (
          <Suspense
            fallback={<div>Loading...</div>}
            key={`hashtag-result-${hashtag._id}`}
          >
            <HashTagResult data={hashtag} />
          </Suspense>
        ));
      case ESearchType.User:
        return response?.data?.map((user: IUser) => (
          <Suspense
            fallback={<div>Loading...</div>}
            key={`user-result-${user._id}`}
          >
            <UserCard user={user} />
          </Suspense>
        ));
    }
  }, [response]);

  return (
    <React.Fragment>
      <PageMetadata title={t('search')} />
      <LayoutWithHeader>
        <StyledContainer>
          <StyledRoot>
            <main>
              <StyledSearchForm>
                <StyledInput
                  type="text"
                  name="search"
                  placeholder={t('searchPlaceholder')}
                  onChange={onChange}
                  value={query.search}
                />
                <StyledFlex gap={1} align="center">
                  <StyledCategoryLabel htmlFor="category">
                    {t('searchCategory')}
                  </StyledCategoryLabel>

                  <StyledCategorySelections
                    name="category"
                    id="searchCategory"
                    onChange={onChange}
                  >
                    <option value={ESearchType.Tweet}>{t('tweet')}</option>
                    <option value={ESearchType.Hashtag}>{t('hashtag')}</option>
                    <option value="people">{t('people')}</option>
                  </StyledCategorySelections>
                </StyledFlex>
                <StyledSubmitButton onClick={onSubmit}>
                  <AiOutlineFileSearch />
                  {t('search')}
                </StyledSubmitButton>
              </StyledSearchForm>
              <Loading />
              {response && (
                <StyledSearchResult>
                  {(response?.data?.length > 0 && resultContent) || (
                    <StyledNoResultFound>
                      {t('searchNoResult')}
                    </StyledNoResultFound>
                  )}
                </StyledSearchResult>
              )}
            </main>
          </StyledRoot>
        </StyledContainer>
      </LayoutWithHeader>
    </React.Fragment>
  );
};

export default SearchPage;

const StyledRoot = styled.div`
  margin-top: 2rem;
`;

const StyledSearchForm = styled.section`
  display: flex;
  align-items: center;
  gap: 3rem;
  background-color: ${({ theme }) => theme.backgroundColor1};
  box-shadow: ${EBoxShadow.BoxShadow1};
  padding: 2rem;
  border-radius: 0.5rem;
  justify-content: center;
`;

const StyledInput = styled.input`
  padding: 1rem;
  border-radius: 0.5rem;
  outline: none;
  border: 0.5px solid #e6e6e6;
`;

const StyledCategoryLabel = styled.label`
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight500};
`;

const StyledCategorySelections = styled.select`
  border: 0.5px solid #e6e6e6;
  min-width: 20rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor1};
  outline: none;
  text-transform: capitalize;

  option {
    text-transform: capitalize;
  }
`;

const StyledSubmitButton = styled.button`
  background: ${({ theme }) => theme.textColor2};
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.textColor4};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledSearchResult = styled.section`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledNoResultFound = styled.p`
  font-size: ${EFontSize.Font6};
  text-align: center;
`;
