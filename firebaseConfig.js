// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIW1uUHzbnpjfAoAveB3kdvS2-FrjwSmg",
  authDomain: "fyp-tripaid.firebaseapp.com",
  databaseURL: "https://fyp-tripaid-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fyp-tripaid",
  storageBucket: "fyp-tripaid.appspot.com",
  messagingSenderId: "675806218388",
  appId: "1:675806218388:web:7b0acb24703b24350a4c81"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export { app, db, auth, storage }