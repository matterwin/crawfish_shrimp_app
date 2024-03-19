import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAlAvdBfsy1Y__Vs9OC9tNfNv1SbwWMhWI",
  authDomain: "crawfish-ea28a.firebaseapp.com",
  projectId: "crawfish-ea28a",
  storageBucket: "crawfish-ea28a.appspot.com",
  messagingSenderId: "1012270354129",
  appId: "1:1012270354129:web:dfd61ed056d3646a107ff0"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
 persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const FIREBASE_GET_AUTH = getAuth(FIREBASE_APP);
