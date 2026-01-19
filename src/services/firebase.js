import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDnjWHhM1FVx5YhjZxsdco6wt-aD6VlBRs',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'fitness-app-c4ce5.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'fitness-app-c4ce5',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'fitness-app-c4ce5.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '345263492453',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:345263492453:web:5b4b5a772affb09b3be58c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
