import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../config/firebase';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const [user, loading] = useAuthState(firebase.auth());
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Route
          {...rest}
          render={props =>
            user && restricted ? (
              <Redirect to='/dashboard' />
            ) : (
              <Component {...props} />
            )
          }
        />
      )}
    </>
  );
};

export default PublicRoute;
