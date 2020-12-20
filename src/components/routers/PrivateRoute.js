import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../config/firebase';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(firebase.auth());
  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Route
          {...rest}
          render={props =>
            user ? <Component {...props} /> : <Redirect to='/' />
          }
        />
      )}
    </>
  );
};

export default PrivateRoute;
