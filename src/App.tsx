import Loader1 from '@components/shared/loaders/loader-1';
import Loading from '@components/shared/loading/loading';
import NotFound from '@pages/not-found';
import { useMyTheme } from '@talons/useMyTheme';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { routes } from 'routes';
import PrivateRoute from 'routes/PrivateRoute';
import { ThemeProvider } from 'styled-components';
import { useApp } from 'useApp';
import './App.css';

const Modal = React.lazy(() => import('@components/shared/modal'));

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
          {routes.map(({ Element, path, isLazy, isPrivate }) => {
            const Component = isLazy ? (
              <Suspense fallback={<Loader1 />}>
                <Element />
              </Suspense>
            ) : (
              <Element />
            );
            const wrapper = (Component: JSX.Element) => {
              if (isPrivate) {
                return <PrivateRoute>{Component}</PrivateRoute>;
              }
              return Component;
            };

            return (
              <Route key={path} path={path} element={wrapper(Component)} />
            );
          })}
          <Route element={<NotFound />} />
        </React.Fragment>
      </Routes>
    );
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Loading />
        <Suspense fallback={<Loader1 />}>
          <Modal />
        </Suspense>
        {content}
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
