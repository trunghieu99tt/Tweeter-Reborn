import Loader1 from '@components/shared/loaders/loader-1';
import Loading from '@components/shared/loading/loading';
import Auth from '@pages/auth';
import NotFound from '@pages/not-found';
import { useMyTheme } from '@talons/useMyTheme';
import React from 'react';
import { Route, Routes } from 'react-router';
import { routes } from 'routes';
import PrivateRouteController from 'routes/PrivateRouteController';
import { ThemeProvider } from 'styled-components';
import { useApp } from 'useApp';

import './App.css';

const App: React.FC = () => {
  const { isLoadingUser, user } = useApp();
  const { theme } = useMyTheme();

  let content = null;

  console.log('user', user);

  if (isLoadingUser) {
    content = <Loader1 />;
  } else if (user?._id) {
    content = (
      <React.Fragment>
        <PrivateRouteController />
      </React.Fragment>
    );
  } else {
    content = (
      <Routes>
        <React.Fragment>
          <Route path={routes.auth} element={<Auth />} />
          <Route element={<NotFound />} />
        </React.Fragment>
      </Routes>
    );
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Loading />
        {content}
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
