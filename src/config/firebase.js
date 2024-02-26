// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAH8vTiPMHU_YZDrP9wV7g62Wzq5Joe9io",
    authDomain: "ori-project-29e67.firebaseapp.com",
    projectId: "ori-project-29e67",
    storageBucket: "ori-project-29e67.appspot.com",
    messagingSenderId: "1005947412874",
    appId: "1:1005947412874:web:ed677b135aa775e297a873"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)