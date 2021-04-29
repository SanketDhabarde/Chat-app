import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDyYA_Je1DfGt09ChIZRP8uhbKgZthrIj4",
    authDomain: "chat-app-4f37d.firebaseapp.com",
    projectId: "chat-app-4f37d",
    storageBucket: "chat-app-4f37d.appspot.com",
    messagingSenderId: "587880578600",
    appId: "1:587880578600:web:1bf4ef17cbb94d98367f1d",
    measurementId: "G-G4QKMKE5WB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
var provider = new firebase.auth.GoogleAuthProvider();

export { auth, storage, provider};
export default db;
