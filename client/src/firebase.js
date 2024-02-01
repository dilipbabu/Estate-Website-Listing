// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-listings-1556e.firebaseapp.com",
  projectId: "real-estate-listings-1556e",
  storageBucket: "real-estate-listings-1556e.appspot.com",
  messagingSenderId: "90483155396",
  appId: "1:90483155396:web:60396655b83cc3a1b18491"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);