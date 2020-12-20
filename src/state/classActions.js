import firebase from '../config/firebase';

var db = firebase.firestore();

export const getClasses = async () => {
  const snapshot = await db.collection('classes').get();
  const data = snapshot.docs.map(doc => {
    const data = doc.data();
    return { ...data, name: doc.id };
  });
  console.log(data);
};
