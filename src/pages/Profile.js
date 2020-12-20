import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from '../config/firebase';

const Profile = () => {
  const profileId = useParams().userId;
  console.log(profileId);
  const [value, loading, error] = useDocument(
    firebase.firestore().collection('users').doc(profileId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );

  return <div>Profile: {value && JSON.stringify(value.data())}</div>;
};

export default Profile;
