import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Page from '../components/layout/Page';
import { useStateValue } from '../state/state';
import { useAuthState } from 'react-firebase-hooks/auth';
import { updateBio, updateImgUrl } from '../state/actions/profileActions';
import firebase from '../config/firebase';

const Profile = () => {
  const [tempBio, setTempBio] = useState('');
  const [user] = useAuthState(firebase.auth());
  const notes = [];
  const profileId = useParams().userId;
  const [
    {
      profile: { firstName, lastName, imgUrl, bio },
      auth: { authId },
    },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    setTempBio(bio);
  }, [bio]);

  const handleChangeBio = e => {
    setTempBio(e.target.value);
  };

  const handleChangeImg = e => {
    updateImgUrl(dispatch, user.uid, e.target.files[0]);
  };

  const handleSubmitBio = e => {
    e.preventDefault();
    updateBio(dispatch, user.uid, tempBio);
  };

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
            <input
              type='file'
              name='file'
              id='file'
              className='form-inputfile'
              onChange={handleChangeImg}
            />
            <label htmlFor='file'>New Profile Image</label>
            <h5>{firstName && firstName + ' ' + lastName}</h5>
            <form className='form' onSubmit={handleSubmitBio}>
              <textarea
                placeholder={bio ? bio : 'Enter a short bio...'}
                value={tempBio}
                onChange={handleChangeBio}></textarea>
              <button>Update bio</button>
            </form>
          </article>
        </section>
      </div>
    </Page>
  );
};

export default Profile;
