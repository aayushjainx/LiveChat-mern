import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAsKLWxHCBcGbDm7oa39947c1YeOk0C1cU',
  authDomain: 'live-chat-mern.firebaseapp.com',
  projectId: 'live-chat-mern',
  storageBucket: 'live-chat-mern.appspot.com',
  messagingSenderId: '298123615442',
  appId: '1:298123615442:web:e912f9af6464f49711210b',
  measurementId: 'G-CSZ0RSTWC3',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
