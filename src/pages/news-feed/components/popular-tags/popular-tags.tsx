import React, { memo, useMemo } from 'react';
import { EHashTagQuery } from '@constants';
import SectionWithHeadingContainer from '@layout/section-with-heading.layout';
import { IHashtag } from '@type/hash-tag.type';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useHashTagService } from 'services/hash-tag.service';
import TagItem from './tag-item';
import Skeleton from 'react-loading-skeleton';

const PopularTags = () => {
  const { t } = useTranslation();
  const { getMostPopularHashTags } = useHashTagService();
  const { data } = useQuery(
    EHashTagQuery.GetPopularTags,
    getMostPopularHashTags,
    {
      staleTime: 1000 * 60 * 5, // 5 mins
    },
  );

  let content = useMemo(
    () =>
      [...Array(5)].map((_, index) => (
        <div
          key={`tag-item-skeleton-${index}`}
          style={{
            marginBottom: '1rem',
          }}
        >
          <Skeleton height={30} width={'100%'}></Skeleton>
          <Skeleton height={30} width={'100%'}></Skeleton>
        </div>
      )),
    [],
  );

  if (data?.length) {
    content = data
      .slice(0, Math.min(data.length, 5))
      .map((hashtag: IHashtag) => {
        const { _id } = hashtag;
        return <TagItem data={hashtag} key={`hashtag-${_id}`} />;
      });
  }

  return (
    <SectionWithHeadingContainer title={t('popularTag')} content={content} />
  );
};

export default memo(PopularTags);
