import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD0UxOENXzIxunh4QShXW7zuqBLypi8uX0',
  authDomain: 'museion-f9110.firebaseapp.com',
  projectId: 'museion-f9110',
  storageBucket: 'museion-f9110.appspot.com',
  messagingSenderId: '1002832174510',
  appId: '1:1002832174510:web:da414afcba1a32df547c3f',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
const storage = firebase.storage();

export { storage, firebase as default };
