// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getStorage } from "firebase/storage";

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
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const database = getFirestore(app)
const storage = getStorage()
const functions = getFunctions(app, 'us-central1')
const getMessagesFunction = httpsCallable(functions, 'getMessages');

export { auth, database, getMessagesFunction, storage };
