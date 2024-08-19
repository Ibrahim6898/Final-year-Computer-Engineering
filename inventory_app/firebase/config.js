import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Messaging is excluded since it's not typically used in mobile apps through Firebase directly

const firebaseConfig = {
  apiKey: "AIzaSyCYfGvZvHIgfC0QqlGbI_vCnBIfByhayBM",
  authDomain: "inventory-app-554b9.firebaseapp.com",
  databaseURL: "https://inventory-app-554b9.firebaseio.com",
  projectId: "inventory-app-554b9",
  storageBucket: "inventory-app-554b9.appspot.com",
  messagingSenderId: "142490673270",
  appId: "1:142490673270:web:62e6f293cb003c0514bf57",
  measurementId: "G-0WXFJ5LBK1"
};

const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);  // If you're using Firestore
const storage = getStorage(app);

// Exporting the initialized services
export { db, storage };
