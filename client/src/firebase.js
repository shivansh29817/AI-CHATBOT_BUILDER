import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKUF0rimO7WhK_zPOKmvAzv5Mt1hF94ro",
  authDomain: "intellibot-builder.firebaseapp.com",
  projectId: "intellibot-builder",
  storageBucket: "intellibot-builder.firebasestorage.app",
  messagingSenderId: "609283733615",
  appId: "1:609283733615:web:17a246ead2cd988162f59a",
  measurementId: "G-N4DKFMKMY2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
