// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBd01Vi9j5iobI2_PcKg5m8Gk5PihAYOfQ",
  authDomain: "monapp-d584e.firebaseapp.com",
  projectId: "monapp-d584e",
  storageBucket: "monapp-d584e.firebasestorage.app",
  messagingSenderId: "244546120222",
  appId: "1:244546120222:web:6c3f7ad4b1f1af12addc0f",
  measurementId: "G-3GXZS1PCR3"
};

const app = initializeApp(firebaseConfig);

// Exporte l'instance d'authentification pour l'utiliser dans ton application
export const auth = getAuth(app);