// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDoluW-KMiyTBGLzVh4EX-yq0Ey5OpikfY",
  authDomain: "ecommerce-app-75547.firebaseapp.com",
  projectId: "ecommerce-app-75547",
  storageBucket: "ecommerce-app-75547.firebasestorage.app",
  messagingSenderId: "101517015176",
  appId: "1:101517015176:web:35a4d49778e39f7f4d873d",
  measurementId: "G-0JYWRSY5RQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth