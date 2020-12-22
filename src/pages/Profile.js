import React, { useState, useEffect } from 'react';
import Page from '../components/layout/Page';
import { useStateValue } from '../state/state';
import {
  updateBio,
  updateImgUrl,
  addNote,
} from '../state/actions/profileActions';

const Profile = () => {
  const [tempBio, setTempBio] = useState('');
  const [note, setNote] = useState('');
  const [
    {
      profile: { firstName, lastName, imgUrl, bio, notes },
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
    updateImgUrl(dispatch, authId, e.target.files[0]);
  };

  const handleChangeNote = e => {
    setNote(e.target.value);
  };

  const handleSubmitBio = e => {
    e.preventDefault();
    updateBio(dispatch, authId, tempBio);
  };

  const handleSubmitNote = e => {
    e.preventDefault();
    addNote(dispatch, authId, note);
  };

  return (
    <Page heading='Profile'>
      <div className='profile'>
        <section className='profile-notes profile-section'>
          <article className='profile-article'>
            <form className='form' onSubmit={handleSubmitNote}>
              <textarea onChange={handleChangeNote}></textarea>
              <button type='submit'>Add note</button>
            </form>
          </article>
          {notes &&
            notes.map(note => {
              return (
                <article key={note.id} className='profile-article'>
                  {note.text}
                </article>
              );
            })}
        </section>
        <section className='profile-sidebar profile-section'>
          <article className='profile-article'>
            <img
              src={imgUrl ? imgUrl : '/img/astronaut.png'}
              alt='Your Avatar'
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
              <button type='submit'>Update bio</button>
            </form>
          </article>
        </section>
      </div>
    </Page>
  );
};

export default Profile;
