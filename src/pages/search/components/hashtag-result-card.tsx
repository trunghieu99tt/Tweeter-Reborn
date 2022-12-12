import { IHashtag } from '@type/hash-tag.type';
import { EBoxShadow, EFontSize, EFontWeight } from 'constants/style.constant';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import styled from 'styled-components';
import React, { memo } from 'react';

interface Props {
  data: IHashtag;
}

const HashtagSearchResult = ({ data }: Props) => {
  const { t } = useTranslation();

  return (
    <StyledRoot to={`${ROUTES.hashTags}/${data.name}`}>
      <StyledName>#{data.name}</StyledName>
      <StyledCounter>
        {t('numberOfTweet')}: <span>{data.count}</span>
      </StyledCounter>
    </StyledRoot>
  );
};

export default memo(HashtagSearchResult);

const StyledRoot = styled(Link)`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.backgroundColor1};
  padding: 1rem 2rem;
  display: block;
  color: #000;
  width: 100%;
  box-shadow: ${EBoxShadow.BoxShadow1};
  border-radius: 0.8rem;
`;

const StyledName = styled.p`
  font-size: ${EFontSize.Font7};
  font-weight: ${EFontWeight.FontWeight500};
  color: ${({ theme }) => theme.textColor2};
`;

const StyledCounter = styled.p`
  font-size: ${EFontSize.Font4};

  span {
    font-size: ${EFontSize.Font5};
    font-weight: ${EFontWeight.FontWeight500};
    color: ${({ theme }) => theme.textColor8};
    margin-left: 1rem;
  }
`;
