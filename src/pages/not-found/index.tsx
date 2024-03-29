import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Root>
      <Helmet title={t('notFound')}></Helmet>
      <Main>
        <HeadingContainer>
          <Heading>
            4<span>0</span>4
          </Heading>
        </HeadingContainer>
        <Description>{t<string>('pageNotFound')}</Description>
        <BackToHome to="/">{t<string>('returnToHomepage')}</BackToHome>
      </Main>
    </Root>
  );
};

export default NotFound;

const Root = styled.div`
  position: relative;
  height: 100vh;
  background-color: #222;
`;

const Main = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  max-width: 500px;
  text-align: center;
`;

const HeadingContainer = styled.div`
  line-height: 153px;
`;

const Heading = styled.h1`
  color: #222;
  font-size: 22rem;
  letter-spacing: 10px;
  margin: 0px;
  font-weight: 700;
  text-shadow: 2px 2px 0px #c9c9c9, -2px -2px 0px #c9c9c9;

  span {
    text-shadow: 2px 2px 0px #ffab00, -2px -2px 0px #ffab00, 0px 0px 8px #ff8700;
    font-size: inherit;
  }
`;

const Description = styled.p`
  color: #c9c9c9;
  font-size: 16px;
  font-weight: 400;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: block;
`;

const BackToHome = styled(Link)`
  color: #fff;
  font-size: 1.2rem;
  border: 1px solid;
  padding: 1rem;
  margin-top: 1rem;
  display: inline-block;
  border-radius: 0.5rem;
`;
