// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOyi0vksrnRPRaAyiVh-3lIv7wEWZCsbk",
  authDomain: "bim-dev-master-firebase.firebaseapp.com",
  projectId: "bim-dev-master-firebase",
  storageBucket: "bim-dev-master-firebase.firebasestorage.app",
  messagingSenderId: "220389912496",
  appId: "1:220389912496:web:7f5f980cf0e3dc9d153075"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseDB = getFirestore()