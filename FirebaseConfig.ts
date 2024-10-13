// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMcNWLBElrE-FUsFVl1cjwRpg2K0DYcNo",
  authDomain: "newstrack-7f3e7.firebaseapp.com",
  projectId: "newstrack-7f3e7",
  storageBucket: "newstrack-7f3e7.appspot.com",
  messagingSenderId: "42329602572",
  appId: "1:42329602572:web:7cf5bedb602ffaa1ac0c29",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
