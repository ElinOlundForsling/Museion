import firebase from '../../config/firebase';

export const signUp = (dispatch, userData) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then(res => {
      return firebase.firestore().collection('users').doc(res.user.uid).set({
        firstName: userData.firstName,
        lastName: userData.lastName,
        class: userData.class,
      });
    })
    .then(() => {
      dispatch({ type: 'sign_up' });
    })
    .catch(error => {
      console.error(error);
      dispatch({ type: 'auth_error', error });
    });
};
