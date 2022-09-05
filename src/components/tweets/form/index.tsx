import Button from '@components/shared/button';
import FileInput from '@components/shared/file-input';
import { StyledFlex } from '@components/shared/shared-style';
import TextAreaWithLinks from '@components/shared/textarea-with-links';
import { EFormType } from '@constants';
import { ITweet } from '@type/tweet.type';
import { EFontSize, EFontWeight } from 'constants/style.constant';
import SectionWithHeadingContainer from '@layout/section-with-heading.layout';
import renderOnlyAuthenticated from 'hoc/switchRenderIfAuthenticated';
import React, { memo, Suspense, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import TweetFormMedia from './tweet-form-media';
import { useTweetForm } from './useTweetForm';

const AudienceSelector = React.lazy(
  () => import('@components/selectors/audience-selector'),
);

type TCreateTweetFormProps = {
  type: EFormType.Create;
};

type TEditTweetFormProps = {
  type: EFormType.Update;
  data: ITweet;
  onCancel: () => void;
};

type Props = TCreateTweetFormProps | TEditTweetFormProps;

const TweetForm = (props: Props) => {
  const { t } = useTranslation();

  const {
    body,
    onChangeFile,
    audience,
    initialMedias,
    media,
    onResetMedia,
    onSubmit,
    onChangeAudience,
    setBody,
  } = useTweetForm({
    tweet: props.type === EFormType.Create ? null : props.data,
  });

  const formMedias = useMemo(() => {
    return [...media, ...initialMedias];
  }, [initialMedias, media]);

  const inputFileId =
    props.type === EFormType.Update
      ? `update-tweet-media-${props.data._id}`
      : `new-tweet-media`;

  const onClickButtonSubmit = async () => {
    await onSubmit();
    if (props.type === EFormType.Update) {
      props.onCancel();
    }
  };

  const title = useMemo(() => {
    return (
      (props.type === EFormType.Create && (
        <StyledHeading>{t('whatOnYourMind')}</StyledHeading>
      )) ||
      null
    );
  }, [props.type]);

  return (
    <SectionWithHeadingContainer
      title={title}
      content={
        <StyledRoot type={props.type}>
          <StyledMain>
            <StyledTweetInputWrapper>
              <TextAreaWithLinks value={body} onChange={setBody} />
            </StyledTweetInputWrapper>
            <TweetFormMedia medias={formMedias} onResetMedia={onResetMedia} />
          </StyledMain>
          <StyledFlex align="center" justify="space-between">
            <StyledFlex gap={1.5} align="center">
              <FileInput
                htmlFor={inputFileId}
                onChange={onChangeFile}
                isMultiple
              />
              <Suspense fallback={<div>...Loading...</div>}>
                <AudienceSelector
                  value={audience}
                  onChange={onChangeAudience}
                />
              </Suspense>
            </StyledFlex>

            <Button onClick={onClickButtonSubmit}>
              {props.type === EFormType.Create ? t('tweet') : t('update')}
            </Button>
          </StyledFlex>
        </StyledRoot>
      }
    />
  );
};

export default renderOnlyAuthenticated(memo(TweetForm));

const StyledRoot = styled.div<{
  type: EFormType;
}>`
  border-radius: 1.2rem;
  padding: 1rem 2rem;
  margin-bottom: 2.5rem;
  min-width: auto;
  max-width: 100%;

  ${({ type }) => type === EFormType.Update && 'max-width: 50rem;'}
`;

const StyledHeading = styled.h4`
  color: var(--gray-2);
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--gray-5);
  font-weight: ${EFontWeight.FontWeight600};
  margin-bottom: 0.8rem;
  font-size: ${EFontSize.Font3};
`;

const StyledMain = styled.div``;

const StyledTweetInputWrapper = styled.div`
  min-height: 10rem;
  margin-bottom: 2rem;
  overflow: auto;
`;
