import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
    
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyCeNqiRaJssqspU8iIZNZi0n5NQ5XiiAZk",
    authDomain: "react-meets-5b73d.firebaseapp.com",
    projectId: "react-meets-5b73d",
    storageBucket: "react-meets-5b73d.appspot.com",
    messagingSenderId: "1001994040870",
    appId: "1:1001994040870:web:a9ede4b4d050646c9658e7",
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;