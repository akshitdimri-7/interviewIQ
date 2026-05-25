import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "interviewiq-9efaa.firebaseapp.com",
  projectId: "interviewiq-9efaa",
  storageBucket: "interviewiq-9efaa.firebasestorage.app",
  messagingSenderId: "473573444174",
  appId: "1:473573444174:web:3c82437bcf941e18eb111f",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
