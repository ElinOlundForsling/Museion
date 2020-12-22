import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../config/firebase';
import { useStateValue } from '../../state/state';
import { getProfile } from '../../state/actions/profileActions';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, loading] = useAuthState(firebase.auth());
  const [
    {
      profile: { imgUrl },
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    if (user) {
      dispatch({ type: 'sign_in', payload: user.uid });
      getProfile(dispatch, user.uid);
    }
  }, [user, imgUrl]);

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
