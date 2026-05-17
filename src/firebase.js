import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDbrKW-8I-s1-_VxY-Ahug4d4HpdBuFkf4",
  authDomain: "ryleni-admin.firebaseapp.com",
  projectId: "ryleni-admin",
  storageBucket: "ryleni-admin.firebasestorage.app",
  messagingSenderId: "1083585176812",
  appId: "1:1083585176812:web:a8488f4666e4775bb1b1c9",
  measurementId: "G-KH7FJX4D36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
