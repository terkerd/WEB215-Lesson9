import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD26I9Emp20EA2zfB0UsSWQb4X8YqiH2o0",
  authDomain: "ig-clone-c91d0.firebaseapp.com",
  projectId: "ig-clone-c91d0",
  storageBucket: "ig-clone-c91d0.appspot.com",
  messagingSenderId: "1044258627831",
  appId: "1:1044258627831:web:280bc6c173fd8a4559f3f2",
  measurementId: "G-DP5Y0W9TMV"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
