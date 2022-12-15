import React, { useMemo } from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { EFontSize } from 'constants/style.constant';
import { BiError } from 'react-icons/bi';
import styled from 'styled-components';

type Props = {
  url: string;
};
const ExternalLinkPreview = ({ url }: Props) => {
  const LinkNotFound = useMemo(() => {
    return (
      <StyledLinkNotFound>
        <p> Link not found!</p>
        <BiError />
      </StyledLinkNotFound>
    );
  }, []);

  return <StyledLinkPreview fallback={LinkNotFound} url={url} />;
};

export default ExternalLinkPreview;

// const StyledRoot = styled.div`
//   min-height: 15rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   background: ${({ theme }) => theme.textColor3};
//   color: ${({ theme }) => theme.textColor4};
// `;

const StyledLinkNotFound = styled.div`
  font-size: ${EFontSize.Font6};
  svg {
    --size: 2rem;
    width: var(--size);
    height: var(--size);
  }
`;

const StyledLinkPreview = styled(LinkPreview)`
  width: 100%;
  height: 100%;
`;
