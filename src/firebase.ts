// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAh4spQrvJ81Uy7Jvt24mDIn9UoMHTmHVM",
  authDomain: "szte-edu-research-2023.firebaseapp.com",
  projectId: "szte-edu-research-2023",
  storageBucket: "szte-edu-research-2023.appspot.com",
  messagingSenderId: "231493636400",
  appId: "1:231493636400:web:0134e4adbf475ed430f8f5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
