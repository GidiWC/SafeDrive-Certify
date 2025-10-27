import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCxg1v9qOHF9HMmSvDEnMAJFYULra9jrEo",
  authDomain: "safedrive-certify-c0842.firebaseapp.com",
  projectId: "safedrive-certify-c0842",
  storageBucket: "safedrive-certify-c0842.firebasestorage.app",
  messagingSenderId: "175154719537",
  appId: "1:175154719537:web:73c67c495beafba79d1e10",
  measurementId: "G-39DBHFMWNL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
