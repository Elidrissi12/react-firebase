import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY-OwsdBso49KykuGb_Lr1gmghgO8NCDk",
  authDomain: "my-app-86020.firebaseapp.com",
  projectId: "my-app-86020",
  storageBucket: "my-app-86020.firebasestorage.app",
  messagingSenderId: "243101904463",
  appId: "1:243101904463:web:faca80c5a64c3e6bcf443a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);