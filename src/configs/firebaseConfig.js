import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5a7_cZyqs3r33w_XKMv4UZtyGwCzSK4E",
  authDomain: "react-app-82896.firebaseapp.com",
  projectId: "react-app-82896",
  storageBucket: "react-app-82896.appspot.com",
  messagingSenderId: "210680262150",
  appId: "1:210680262150:web:7a93b47ff05e157bea9d87",
  measurementId: "G-YCBBMCMHR9"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

