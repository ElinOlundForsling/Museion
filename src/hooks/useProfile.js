import React, { useState, useEffect } from 'react';
import { useStateValue } from '../state/state';
import firebase from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const useProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [user] = useAuthState(firebase.auth());
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    if (user) {
      setLoading(true);
      dispatch({ type: 'profile_loading' });
      const db = firebase.firestore();
      db.collection('users')
        .doc(user.uid)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            setProfile(doc.data());
            setLoading(false);
            dispatch({ type: 'get_profile', payload: doc.data() });
          } else {
            setError('Not Found');
            setLoading(false);
            dispatch({ type: 'profile_error', payload: 'No profile found' });
          }
        })
        .catch(function (error) {
          setLoading(false);
          setError('Server Error');
          dispatch({ type: 'profile_error', payload: 'Error getting profile' });
        });
    }
  }, [user]);
  return { profile, loading, error };
};

export default useProfile;
