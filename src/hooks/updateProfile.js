import React, { useState, useEffect } from 'react';
import { useStateValue } from '../state/state';
import firebase from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const UpdateBio = () => {
  const [user] = useAuthState(firebase.auth());
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    if (user) {
      dispatch({ type: 'profile_loading' });
      const db = firebase.firestore();
      db.collection('users')
        .doc(user.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            dispatch({ type: 'get_profile', payload: doc.data() });
          } else {
            dispatch({ type: 'profile_error', payload: 'No profile found' });
          }
        })
        .catch(function (error) {
          dispatch({ type: 'profile_error', payload: 'Error getting profile' });
        });
    }
  }, [user]);
};

export const UpdateImgUrl = () => {};
