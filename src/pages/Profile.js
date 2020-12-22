import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../config/firebase';
import Page from '../components/layout/Page';
import { useStateValue } from '../state/state';
import { updateBio, updateImgUrl } from '../hooks/updateProfile';

const Profile = () => {
  const notes = [];
  const profileId = useParams().userId;
  const [user] = useAuthState(firebase.auth());
  const [value, loading, error] = useDocument(
    firebase.firestore().collection('users').doc(profileId),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    },
  );
  const [
    {
      profile: { firstName, lastName, imgUrl, bio },
    },
    dispatch,
  ] = useStateValue();

  return (
    <Page heading='Profile'>
      <div className='profile'>
        <section className='profile-notes profile-section'>
          <article className='profile-article'>
            <form className='form'>
              <textarea></textarea>
              <button>Add note</button>
            </form>
          </article>
        </section>
        <section className='profile-sidebar profile-section'>
          <article className='profile-article'>
            <img
              src={imgUrl ? imgUrl : '/img/astronaut.png'}
              alt='your profile image'
              className='img-mid-round'
            />
            <input type='file' name='file' id='file' class='form-inputfile' />
            <label for='file'>New Profile Image</label>
            <h5>{firstName && firstName + ' ' + lastName}</h5>
            <form className='form'>
              <textarea
                placeholder={bio ? bio : 'Enter a short bio...'}></textarea>
              <button>Update bio</button>
            </form>
          </article>
        </section>
      </div>
    </Page>
  );
};

export default Profile;
