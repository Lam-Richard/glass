import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoXTxwfoXftBPA5Uji09MVOIKORonzqBM",
  authDomain: "dtr-glass.firebaseapp.com",
  databaseURL: "https://dtr-glass-default-rtdb.firebaseio.com",
  projectId: "dtr-glass",
  storageBucket: "dtr-glass.appspot.com",
  messagingSenderId: "223266185762",
  appId: "1:223266185762:web:fefbe99be9579b3c11a07b",
  measurementId: "G-YVJ47CHBZX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);