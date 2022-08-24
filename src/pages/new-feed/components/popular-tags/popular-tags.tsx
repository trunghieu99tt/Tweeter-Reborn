import { EHashTagQuery } from '@constants';
import SideBarWrapper from '@layout/sidebar.layout';
import { IHashtag } from '@type/hash-tag.type';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useHashTagService } from 'services/hash-tag.service';
import TagItem from './tag-item';

const PopularTags = () => {
  const { t } = useTranslation();
  const { getMostPopularHashTags } = useHashTagService();
  const { data } = useQuery(
    EHashTagQuery.GetPopularTags,
    getMostPopularHashTags,
  );

  if (!data?.length) return null;

  const content = data
    .slice(0, Math.min(data.length, 5))
    .map((hashtag: IHashtag) => {
      const { _id } = hashtag;

      return <TagItem data={hashtag} key={`hashtag-${_id}`} />;
    });

  return <SideBarWrapper title={t('popularTag')} content={content} />;
};

export default PopularTags;
