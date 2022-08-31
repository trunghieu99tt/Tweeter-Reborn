import MediaViewer from '@components/shared/media-viewer';
import { EViewMode } from '@constants';
import { IMedia } from '@type/app.type';
import { EFontSize, EFontWeight } from 'constants/style.constant';
import React, { memo } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import styled from 'styled-components';

type Props = {
  medias: IMedia[];
  onResetMedia: () => void;
};

const MAX_MEDIA_VIEW = 5;

const TweetFormMedia = ({ medias, onResetMedia }: Props) => {
  const mediaLength = medias.length;
  let listMode: EViewMode = EViewMode.None;

  if (mediaLength > 2) {
    listMode = EViewMode.Grid;
  } else if (mediaLength > 1) {
    listMode = EViewMode.Flex;
  } else if (mediaLength > 0) {
    listMode = EViewMode.Block;
  }
  const remainingSlots = Math.max(0, mediaLength - MAX_MEDIA_VIEW);

  return (
    <StyledRoot mode={listMode}>
      <StyledResetMediaButton onClick={onResetMedia}>
        <ImCancelCircle />
      </StyledResetMediaButton>
      {medias
        ?.slice(0, Math.min(medias.length, MAX_MEDIA_VIEW))
        .map((media) => {
          return (
            <StyledItem key={`media-item-preview-${media.id}`}>
              <MediaViewer data={media} />
            </StyledItem>
          );
        })}
      {remainingSlots > 0 && (
        <StyledItemPlaceholder>{remainingSlots}+</StyledItemPlaceholder>
      )}
    </StyledRoot>
  );
};

export default memo(TweetFormMedia);

const StyledItem = styled.article``;

const StyledItemPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${EFontSize.GiantFont1};
  font-weight: ${EFontWeight.FontWeight500};
  background: rgba(0, 0, 0, 0.5);
  color: ${({ theme }) => theme.textColor1};
`;

const StyledRoot = styled.div<{
  mode: EViewMode;
}>`
  position: relative;
  margin-top: 1rem;
  margin-bottom: 2rem;
  position: relative;

  display: ${(props) => props.mode};

  ${(props) =>
    props.mode === 'block' &&
    `
        height: 30rem;
    `};

  ${(props) =>
    props.mode === 'flex' &&
    `
        & > img{
            width: 50%;
        }
    `};

  ${(props) =>
    props.mode === 'grid' &&
    `
        grid-template-rows: repeat(2, 20rem);
        grid-template-columns: repeat(6, 1fr);
        
        ${StyledItem}:nth-of-type(1){
            grid-row: 1;
            grid-column: 1/span 3;
        }
        
        ${StyledItem}:nth-of-type(2){
            grid-row: 1;
            grid-column: 4/-1;
        }
        
        ${StyledItem}:nth-of-type(3){
            grid-row: 2;
            grid-column: 1/span 2;
        }
        
        ${StyledItem}:nth-of-type(4){
            grid-row: 2;
            grid-column: 3/span 2;
        }
        
        ${StyledItem}:nth-of-type(5), ${StyledItemPlaceholder}{
            grid-row: 2;
            grid-column: 5/-1;
            position: relative;
        }
    `}
`;

const StyledResetMediaButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;

  svg {
    --size: 1.5rem;
    width: var(--size);
    height: var(--size);
  }
`;
