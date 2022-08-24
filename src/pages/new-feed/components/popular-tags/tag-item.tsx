import { EEndpoints } from '@constants';
import { IHashtag } from '@type/hash-tag.type';
import { nFormatter } from '@utils/helper';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const TagItem = ({ data }: { data: IHashtag }) => {
  const { t } = useTranslation();
  const { _id, count, name } = data;

  return (
    <StyledTagItemRoot
      key={`popular-tag-${_id}`}
      to={`${EEndpoints.HASH_TAG}/${name}`}
    >
      <StyledTagName>#{name}</StyledTagName>
      <StyledTagCounter>
        {nFormatter(count)} {`${t('tweet')}${count > 1 ? 's' : ''}`}{' '}
      </StyledTagCounter>
    </StyledTagItemRoot>
  );
};
export default React.memo(TagItem);

export const StyledTagItemRoot = styled(Link)`
  margin-bottom: 2.5rem;
  display: block;
  color: var(--blue-1);
`;

export const StyledTagName = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
`;

export const StyledTagCounter = styled.span`
  color: var(--gray-1);
  font-size: 1.2rem;
  font-weight: 500;
`;
