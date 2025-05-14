import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBomhoFgkH0UOuW99Y9lYpeXancsLCTgaY",
  authDomain: "quantos-dias-faltam.firebaseapp.com",
  projectId: "quantos-dias-faltam",
  storageBucket: "quantos-dias-faltam.firebasestorage.app",
  messagingSenderId: "535970054918",
  appId: "1:535970054918:web:9e7c7651b20c9421fe9487",
  measurementId: "G-J56Z8TW6MK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { analytics, db };
