// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD59yQBmxc4VLOOuRpW6bEtOS6FyBVIQv8",
  authDomain: "logincheck-c9919.firebaseapp.com",
  projectId: "logincheck-c9919",
  storageBucket: "logincheck-c9919.appspot.com",
  messagingSenderId: "153060925938",
  appId: "1:153060925938:web:b93f5799603e6247568b6b",
  measurementId: "G-XXXXXXXXXX" // Optional, can be omitted if not using analytics
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
 
