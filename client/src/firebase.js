// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernauth-35124.firebaseapp.com",
  projectId: "mernauth-35124",
  storageBucket: "mernauth-35124.appspot.com",
  messagingSenderId: "1084588382030",
  appId: "1:1084588382030:web:22eb5da8a569c03ec3701f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
