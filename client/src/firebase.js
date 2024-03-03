// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nex-vita.firebaseapp.com",
  projectId: "nex-vita",
  storageBucket: "nex-vita.appspot.com",
  messagingSenderId: "1053667746150",
  appId: "1:1053667746150:web:ba13788bfa053ed19ba8a7"
};

// Initialize Firebase
 export const  app = initializeApp(firebaseConfig);