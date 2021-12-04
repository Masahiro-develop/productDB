// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_FIREBASE_AUTH_DOMAIN,
    REACT_APP_FIREBASE_DATABASE_URL,
    REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID
} = process.env

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID
};



// const firebaseConfig = {
//   apiKey: "AIzaSyBcpBpO1VMJWYvVU4sPI6lS4LUgE0YvwHA",
//   authDomain: "production-management-project.firebaseapp.com",
//   databaseURL: "https://production-management-project-default-rtdb.firebaseio.com",
//   projectId: "production-management-project",
//   storageBucket: "production-management-project.appspot.com",
//   messagingSenderId: "394264435442",
//   appId: "1:394264435442:web:9d5860652b636035b54e6b"
// };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);