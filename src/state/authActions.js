import firebase from '../config/firebase';

export const signUp = userData => {
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
      // dispatch({ type: 'SIGNUP_SUCCESS' });
    })
    .catch(error => {
      console.error(error);
      // dispatch({ type: 'SIGNUP_ERROR', error });
    });
};
