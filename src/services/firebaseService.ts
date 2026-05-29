import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCJc-AKg01QGbRmKjMB96BSp2QB-eJ3A2c",
  authDomain: "creativeprj-42272-b3685.firebaseapp.com",
  databaseURL: "https://creativeprj-42272-b3685-default-rtdb.firebaseio.com",
  projectId: "creativeprj-42272-b3685",
  storageBucket: "creativeprj-42272-b3685.firebasestorage.app",
  messagingSenderId: "473514937461",
  appId: "1:473514937461:web:0b61734f489114ec6e7c3c",
  measurementId: "G-DPEVCXDDES"
};

export const adminUid = "j0oFA3U7SPe8pTNHMzOOxHIzlzn1"

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

