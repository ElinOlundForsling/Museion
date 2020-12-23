import firebase, { storage } from '../../config/firebase';

const getNotes = (dispatch, id) => {
  firebase
    .firestore()
    .collection('users')
    .doc(id)
    .collection('notes')
    .get()
    .then(doc => {
      const notes = doc.docs.map(doc => {
        let docData = doc.data();
        return { ...docData, id: doc.id };
      });
      dispatch({ type: 'update_notes', payload: notes });
    })
    .catch(error => {
      dispatch({
        type: 'profile_error',
        payload: `Error getting notes: ${error}`,
      });
    });
};

export const getProfile = (dispatch, id) => {
  dispatch({ type: 'profile_loading' });
  const db = firebase.firestore();
  db.collection('users')
    .doc(id)
    .get()
    .then(function (doc) {
      if (doc.exists) {
        dispatch({ type: 'get_profile', payload: doc.data() });
        getNotes(dispatch, id);
      } else {
        dispatch({ type: 'profile_error', payload: 'No profile found' });
      }
    })
    .catch(function (error) {
      dispatch({
        type: 'profile_error',
        payload: `Error getting profile: ${error}`,
      });
    });
};

export const updateBio = (dispatch, id, bio) => {
  dispatch({ type: 'profile_loading' });
  firebase
    .firestore()
    .collection('users')
    .doc(id)
    .set(
      {
        bio,
      },
      { merge: true },
    )
    .then(dispatch({ type: 'update_bio', payload: bio }))
    .catch(error => dispatch({ type: 'profile_error', payload: error }));
};

export const updateImgUrl = (dispatch, id, img) => {
  dispatch({ type: 'profile_loading' });
  const uploadTask = storage.ref(`/${id}/profile_images/${img.name}`).put(img);
  uploadTask.on('state_changed', console.log, console.error, () => {
    storage
      .ref(id + '/profile_images')
      .child(img.name)
      .getDownloadURL()
      .then(url => {
        firebase
          .firestore()
          .collection('users')
          .doc(id)
          .set(
            {
              imgUrl: url,
            },
            { merge: true },
          )
          .then(dispatch({ type: 'update_img_url', payload: url }))
          .catch(error => dispatch({ type: 'profile_error', payload: error }));
      })
      .catch(error => dispatch({ type: 'profile_error', payload: error }));
  });
};

export const addNote = (dispatch, id, note) => {
  dispatch({ type: 'profile_loading' });
  firebase
    .firestore()
    .collection('users')
    .doc(id)
    .collection('notes')
    .add({
      text: note,
      date: Date.now(),
      taken: 'Profile',
    })
    .then(getNotes(dispatch, id))
    .catch(error => dispatch({ type: 'profile_error', payload: error }));
};
