// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,signInWithCredential, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCUDXdTfcfyWQoQUmJZIzvV0tV60S2B3Tc",
    authDomain: "react-native-test-8d90d.firebaseapp.com",
    projectId: "react-native-test-8d90d",
    storageBucket: "react-native-test-8d90d.appspot.com",
    messagingSenderId: "750477199673",
    appId: "1:750477199673:web:7faa4914df41b23d6a40e8",
    measurementId: "G-8VV628WV4T"
};

// Initialize Firebase
let app;
if (getApps().length == 0) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApp()
}
const analytics = getAnalytics(app);
const auth = getAuth()
const database = getFirestore(app)
const storage = getStorage()
export { auth, analytics, database, storage }