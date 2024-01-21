// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsoynXAB3CHakXhTxuVzHmndYBzOcfbYo",
  authDomain: "media-1fe83.firebaseapp.com",
  projectId: "media-1fe83",
  storageBucket: "media-1fe83.appspot.com",
  messagingSenderId: "105114031220",
  appId: "1:105114031220:web:e1c7f543680b9319996d21"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// check connection of Code to Firebase
//console.log(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, onAuthStateChanged };