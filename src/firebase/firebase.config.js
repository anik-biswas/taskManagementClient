// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlIBFnUWDDqsC-ex8cV0jX2LjOK0wYPMQ",
  authDomain: "taskmanagement-32206.firebaseapp.com",
  projectId: "taskmanagement-32206",
  storageBucket: "taskmanagement-32206.appspot.com",
  messagingSenderId: "924554906170",
  appId: "1:924554906170:web:ed49cd40feec7ad11b0303"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;