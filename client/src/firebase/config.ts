import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB569w_r7DH_r-mpNyk805lIL3bQ88jQSg",
  authDomain: "undergraduation-crm-188f9.firebaseapp.com",
  projectId: "undergraduation-crm-188f9",
  storageBucket: "undergraduation-crm-188f9.firebasestorage.app",
  messagingSenderId: "781515016825",
  appId: "1:781515016825:web:1be1b6b461c0096dada2a8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);