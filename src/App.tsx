import Loader1 from '@components/shared/loaders/loader-1';
import Loading from '@components/shared/loading/loading';
import Auth from '@pages/auth';
import Bookmark from '@pages/bookmarks';
import Explore from '@pages/explore';
import NewsFeed from '@pages/news-feed';
import NotFound from '@pages/not-found';
import NotificationPage from '@pages/notifications';
import { useMyTheme } from '@talons/useMyTheme';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { routes } from 'routes';
import PrivateRoute from 'routes/PrivateRoute';
import { ThemeProvider } from 'styled-components';
import { useApp } from 'useApp';

import './App.css';

const ProfilePage = React.lazy(() => import('@pages/profile'));

const App: React.FC = () => {
  const { isLoadingUser } = useApp();
  const { theme } = useMyTheme();

  let content = null;

  if (isLoadingUser) {
    content = <Loader1 />;
  } else {
    content = (
      <Routes>
        <React.Fragment>
          <Route path={routes.auth} element={<Auth />} />
          <Route path={routes.home} element={<NewsFeed />} />
          <Route
            path={`${routes.profile}/:userId`}
            element={
              <Suspense fallback={<Loader1 />}>
                <ProfilePage />
              </Suspense>
            }
          />
          <Route
            path={routes.notifications}
            element={
              <PrivateRoute>
                <NotificationPage />
              </PrivateRoute>
            }
          />
          <Route path={routes.explore} element={<Explore />} />
          <Route
            path={routes.bookmark}
            element={
              <PrivateRoute>
                <Bookmark />
              </PrivateRoute>
            }
          />
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
