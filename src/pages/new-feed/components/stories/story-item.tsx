import StoryViewer from '@components/story/story-viewer';
import { IStory } from '@type/story.type';
import { EFontSize, EFontWeight } from 'constants/style.constant';
import React, { memo } from 'react';
import styled from 'styled-components';

type Props = {
  data: IStory;
};

const StoryItem = ({ data }: Props) => {
  const ownerName = data?.owner?.name || '';
  const ownerAvatar = data?.owner?.avatar || '';

  return (
    <div>
      <StoryViewer data={data} />
      {ownerAvatar && (
        <figure>
          <StyledOwnerAvatar
            src={ownerAvatar}
            alt="owner avatar"
            loading="lazy"
          />
        </figure>
      )}
      <StyledOwnerName>{ownerName}</StyledOwnerName>
    </div>
  );
};

export default memo(StoryItem);

const StyledOwnerAvatar = styled.img`
  --size: 3rem;
  width: var(--size);
  height: var(--size);
  position: absolute;
  top: 1rem;
  left: 1rem;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(256, 256, 256, 0.5);
`;

const StyledOwnerName = styled.p`
  position: absolute;
  bottom: 0;
  color: ${({ theme }) => theme.textColor1};
  font-size: ${EFontSize.Font3};
  padding: 0.5rem;
  font-weight: ${EFontWeight.FontWeight600};
`;
