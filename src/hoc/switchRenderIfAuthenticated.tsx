/* eslint-disable react/display-name */
import React from 'react';
import useUserService from 'services/user.service';

const switchRenderIfAuthenticated = <P extends Record<string, any>>(
  ShouldBeRenderedComponentIfAuthenticated: React.ComponentType<P>,
  ShouldBeRenderedComponentIfNotAuthenticated?: React.ComponentType<P>,
) => {
  return (props: P) => {
    const { getCurrentUser } = useUserService();
    const user = getCurrentUser();

    if (!user?._id?.length)
      return ShouldBeRenderedComponentIfNotAuthenticated ? (
        <ShouldBeRenderedComponentIfNotAuthenticated {...props} />
      ) : null;

    return (
      <React.Fragment>
        <ShouldBeRenderedComponentIfAuthenticated {...props} />
      </React.Fragment>
    );
  };
};

export default switchRenderIfAuthenticated;
