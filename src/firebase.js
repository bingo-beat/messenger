import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBoIkuulTusVwi5rCNGk9Hb2xiXVsriubw",
  authDomain: "messenger-289b0.firebaseapp.com",
  projectId: "messenger-289b0",
  storageBucket: "messenger-289b0.appspot.com",
  messagingSenderId: "351411596726",
  appId: "1:351411596726:web:088cbdb482a49d72b9a517",
  measurementId: "G-69Q0PPBMER",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
