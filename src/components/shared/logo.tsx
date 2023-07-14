import { useWindowSize } from '@hooks/useWindowSize';
import TweeterLight from '@images/tweeter-light.svg';
import SmallTweeter from '@images/tweeter-small.svg';
import Tweeter from '@images/tweeter.svg';
import { EThemes } from 'constants/style.constant';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store';
import React from 'react';
import styled from 'styled-components';

type Props = {
  isDark?: boolean;
};

const Logo = ({ isDark }: Props): JSX.Element => {
  const theme = useSelector((state: RootState) => state.appState.theme);
  const { width } = useWindowSize();

  let imageSrc = theme !== EThemes.LIGHT ? TweeterLight : Tweeter;
  const isDesktop = width > 768;
  if (!isDesktop) {
    imageSrc = SmallTweeter;
  }

  return (
    <Link to="/">
      <StyledLogoImg src={imageSrc} alt="Logo" isDark={isDark} />
    </Link>
  );
};

export default Logo;

const StyledLogoImg = styled.img<{
  isDark?: boolean;
}>`
  filter: ${({ isDark }) => (isDark ? 'invert(1)' : 'invert(0)')};
`;
