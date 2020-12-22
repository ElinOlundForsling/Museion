import firebase from '../../config/firebase';

var db = firebase.firestore();

export const getClasses = async () => {
  const snapshot = await db.collection('classes').get();
  const data = snapshot.docs.map(doc => {
    const data = doc.data();
    return { ...data, name: doc.id };
  });
};

export const getClassmates = async (dispatch, classN) => {
  db.collection('users')
    .where('class', '==', classN)
    .get()
    .then(doc => {
      const classmates = doc.docs.map(doc => {
        let docData = doc.data();
        return { ...docData, id: doc.id };
      });
      dispatch({ type: 'get_classmates', payload: classmates });
    })
    .catch(error => dispatch({ type: 'class_error', payload: error }));
};
