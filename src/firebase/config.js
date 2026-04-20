import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBzwLoWEIShZi23WOjSHsiXAXf_uh4w4ak",
  authDomain: "sunnxt-90060.firebaseapp.com",
  projectId: "sunnxt-90060",
  storageBucket: "sunnxt-90060.firebasestorage.app",
  messagingSenderId: "465380135830",
  appId: "1:465380135830:web:0f653b71fe38d711a603b7",
  measurementId: "G-B1S2JQBYNW"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
