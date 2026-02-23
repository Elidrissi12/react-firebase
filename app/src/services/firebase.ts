// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY-OwsdBso49KykuGb_Lr1gmghgO8NCDk",
  authDomain: "my-app-86020.firebaseapp.com",
  projectId: "my-app-86020",
  storageBucket: "my-app-86020.firebasestorage.app",
  messagingSenderId: "243101904463",
  appId: "1:243101904463:web:faca80c5a64c3e6bcf443a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication instance
export const auth = getAuth(app);