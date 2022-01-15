import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAjQ7t2M0Xwk3fAzmzuriIM9_xSG6dmxBw",
  authDomain: "journal-app-a7a75.firebaseapp.com",
  projectId: "journal-app-a7a75",
  storageBucket: "journal-app-a7a75.appspot.com",
  messagingSenderId: "286742380524",
  appId: "1:286742380524:web:ba001fde7b7497b4b2cac9",
  measurementId: "G-2YNK9ZDHWN"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

