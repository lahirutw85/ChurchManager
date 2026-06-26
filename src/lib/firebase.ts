import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "PLACEHOLDER_API_KEY",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "church-manager-e3124.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "church-manager-e3124",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "church-manager-e3124.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "39535536696",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:39535536696:web:bfe767ba56fcf3d71914cd",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-P5J7MZF9VQ",
};

if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    console.warn(
        "Firebase API Key is missing. Please add VITE_FIREBASE_API_KEY to your .env file."
    );
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
