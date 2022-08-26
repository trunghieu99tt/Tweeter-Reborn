import { EEndpoints } from '@constants';
import { IHashtag } from '@type/hash-tag.type';
import { nFormatter } from '@utils/helper';
import { EFontSize, EFontWeight } from 'constants/style.constant';
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
      to={`${EEndpoints.HashTag}/${name}`}
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
  color: ${({ theme }) => theme.backgroundColor2};
`;

export const StyledTagName = styled.p`
  font-size: ${EFontSize.Font7};
  font-weight: ${EFontWeight.FontWeight600};
  word-break: break-all;
`;

export const StyledTagCounter = styled.span`
  color: ${({ theme }) => theme.textColor1};
  font-size: ${EFontSize.Font3};
  font-weight: ${EFontWeight.FontWeight500};
`;
