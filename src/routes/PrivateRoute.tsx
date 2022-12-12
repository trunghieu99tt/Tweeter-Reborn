import React from 'react';

import { Navigate } from 'react-router-dom';

import { ROUTES } from 'routes';
import useUserService from 'services/user.service';

type Props = {
  children: JSX.Element;
};

/**
 * Private route component, check if user is valid else redirect
 *
 * @param Component
 *  Component to be rendered on the route
 * @param rest
 *  Props passed in
 */
const PrivateRoute = ({ children }: Props) => {
  const { getCurrentUser } = useUserService();
  const user = getCurrentUser();

  if (!user) return <Navigate to={ROUTES.auth} />;

  return children;
};

export default PrivateRoute;
