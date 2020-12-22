import firebase, { storage } from '../../config/firebase';

const updateBio = (dispatch, id, bio) => {
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

const updateImgUrl = (dispatch, id, img) => {
  const uploadTask = storage.ref(`/profilePictures/${img.name}`).put(img);
  uploadTask.on('state_changed', console.log, console.error, () => {
    storage
      .ref('profilePictures')
      .child(img.name)
      .getDownloadURL()
      .then(url => {
        firebase.firestore().collection('users').doc(id).set(
          {
            imgUrl: url,
          },
          { merge: true },
        );
        return url
          .then(url => dispatch({ type: 'update_img_url', payload: url }))
          .catch(error => dispatch({ type: 'profile_error', payload: error }));
      })
      .catch(error => dispatch({ type: 'profile_error', payload: error }));
  });
};

export { updateBio, updateImgUrl };
