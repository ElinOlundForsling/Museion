const firebase = '../config/firebase';
const db = firebase.firestore();

export const updateBio = userId => {
  try {
    db.collection('users')
      .doc(userId)
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
  } catch (error) {
    console.error('ERROR!: ', error.message);
    dispatch({ type: 'profile_error', payload: 'Server error' });
  }
};

export const updateImgUrl = userId => {
  try {
  } catch (error) {
    console.error('ERROR!: ', error.message);
  }
};
