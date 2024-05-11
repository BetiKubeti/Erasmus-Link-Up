// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzRk4-KW4_AO0siKzvsT4PXFqlzrqk_ow",
    authDomain: "erasmus-link-up.firebaseapp.com",
    projectId: "erasmus-link-up",
    storageBucket: "erasmus-link-up.appspot.com",
    messagingSenderId: "766779675075",
    appId: "1:766779675075:web:867436f352c3126c912d76",
    measurementId: "G-M1K9K7H37C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { app, auth, firestore }