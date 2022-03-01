// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCu6HPNq5zfXsXslNBpqjZOb6Dd_fLBAsI",
    authDomain: "shop-a787a.firebaseapp.com",
    projectId: "shop-a787a",
    storageBucket: "shop-a787a.appspot.com",
    messagingSenderId: "965096174562",
    appId: "1:965096174562:web:9daae12ce9ddbf57bf7fbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app