import DefaultUnknownAvatar from '@images/user.png';
import React, { useEffect, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

interface Props {
  src: string;
  alt: string;
  defaultSrc?: any;
  customStyles?: string;
}

const ImageWithPlaceholder = ({
  alt,
  defaultSrc = DefaultUnknownAvatar,
  customStyles,
  src: propsSrc,
}: Props): JSX.Element => {
  const [src, setSrc] = useState<string>(propsSrc);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        if (loading) {
          setSrc(defaultSrc);
        }
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [loading]);

  return (
    <React.Fragment>
      {loading && <ClipLoader />}
      <StyledImage
        src={src}
        alt={alt}
        hidden={loading}
        customStyles={customStyles}
        onLoad={() => {
          setLoading(false);
        }}
        onError={() => {
          console.log('error');
          setLoading(false);
          setSrc(defaultSrc);
        }}
      />
    </React.Fragment>
  );
};

export default ImageWithPlaceholder;

const StyledImage = styled('img')<{
  customStyles?: string;
  hidden?: boolean;
}>`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${({ hidden }) => hidden && `display: none`}

  ${(props) => props?.customStyles}
`;
