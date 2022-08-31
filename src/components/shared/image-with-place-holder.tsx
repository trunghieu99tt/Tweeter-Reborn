import DefaultUnknownAvatar from '@images/user.png';
import React, { useEffect, useState } from 'react';
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
  const [src, setSrc] = useState<any>(propsSrc);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const image = document.createElement('img');
    image.src = src;
    image.onerror = () => {
      setLoading(false);
      setSrc(defaultSrc);
    };
    image.onload = () => {
      setLoading(false);
    };

    return () => {
      image.src = '';
      setSrc('');
    };
  }, [defaultSrc]);

  if (loading) {
    return <ClipLoader />;
  }

  return <Image src={src} alt={alt} customStyles={customStyles}></Image>;
};

export default ImageWithPlaceholder;

const Image = styled('img')<{
  customStyles?: string;
}>`
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${(props) => props.customStyles}
`;
