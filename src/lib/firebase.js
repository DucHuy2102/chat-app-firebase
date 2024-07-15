import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
    authDomain: 'reactchat-app-9da09.firebaseapp.com',
    projectId: 'reactchat-app-9da09',
    storageBucket: 'reactchat-app-9da09.appspot.com',
    messagingSenderId: '511424628010',
    appId: '1:511424628010:web:3040cf836f8fc3643fca53',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
