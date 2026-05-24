
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDbrKW-8I-s1-_VxY-Ahug4d4HpdBuFkf4",
    authDomain: "ryleni-admin.firebaseapp.com",
    projectId: "ryleni-admin",
    storageBucket: "ryleni-admin.firebasestorage.app",
    messagingSenderId: "1083585176812",
    appId: "1:1083585176812:web:a8488f4666e4775bb1b1c9",
    measurementId: "G-KH7FJX4D36"
};

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/webmasters.readonly');

export { db, storage, auth, googleProvider };
