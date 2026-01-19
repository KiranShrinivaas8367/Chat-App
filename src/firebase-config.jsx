// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; //Related with Authorisation
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhypsW922iIZmZBGZyPSzpufdBJW4sMwM",
  authDomain: "chatapp-react-cd947.firebaseapp.com",
  projectId: "chatapp-react-cd947",
  storageBucket: "chatapp-react-cd947.firebasestorage.app",
  messagingSenderId: "239287920599",
  appId: "1:239287920599:web:5d68c161a88338ccc60d92",
  measurementId: "G-3MC509SJW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);