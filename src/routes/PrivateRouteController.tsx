import PrivateRoute from 'routes/PrivateRoute';
import { NewsFeed } from '@pages/new-feed';
import React, { memo, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { routes } from 'routes';

const PrivateRouteController = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <React.Fragment>
      <Routes>
        <Route
          path={routes.home}
          element={
            <PrivateRoute>
              <NewsFeed />
            </PrivateRoute>
          }
        />
      </Routes>
    </React.Fragment>
  );
};

export default memo(PrivateRouteController);
