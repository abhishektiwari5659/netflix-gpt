// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxyghMcyWzySJwjIyVV43qP-piE90Nykc",
  authDomain: "netflixgpt-295ad.firebaseapp.com",
  projectId: "netflixgpt-295ad",
  storageBucket: "netflixgpt-295ad.firebasestorage.app",
  messagingSenderId: "163006024221",
  appId: "1:163006024221:web:fe6089e2d269834364d4f4",
  measurementId: "G-QNKGQC9PTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();