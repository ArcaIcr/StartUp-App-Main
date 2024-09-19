// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWbpmLirjdfh6a1i_oZ3H4pT1YjwLCXQs",
  authDomain: "startup-compass.firebaseapp.com",
  projectId: "startup-compass",
  storageBucket: "startup-compass.appspot.com",
  messagingSenderId: "594961365319",
  appId: "1:594961365319:web:cd5fad66477c697635f462",
  measurementId: "G-W3S6MVXDD2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
