import React, { useEffect } from 'react';
import { useStateValue } from '../state/state';
import firebase from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const UpdateBio = bio => {
  const [user] = useAuthState(firebase.auth());
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    if (user) {
      dispatch({ type: 'profile_loading' });
      const db = firebase.firestore();
      db.collection('users')
        .doc(user.uid)
        .set(
          {
            bio,
          },
          { merge: true },
        )
        .then(function (doc) {
          console.log(doc);
        })
        .catch(function (error) {
          dispatch({ type: 'profile_error', payload: 'Error updating bio' });
        });
    }
  }, [user]);
  return user;
};

const UpdateImgUrl = () => {};

export { UpdateBio, UpdateImgUrl };
