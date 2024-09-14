// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
//Auth
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore"
import "firebase/compat/auth"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV74Djc9lkGDGC0y7pXvJjl3-r0KjwNKQ",
  authDomain: "e-clone-d5ecc.firebaseapp.com",
  projectId: "e-clone-d5ecc",
  storageBucket: "e-clone-d5ecc.appspot.com",
  messagingSenderId: "388187010728",
  appId: "1:388187010728:web:c4c03d9543865e8ce3349d"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = app.firestore()