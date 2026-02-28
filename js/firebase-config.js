import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "merlin-infraspace-rmc.firebaseapp.com",
  projectId: "merlin-infraspace-rmc",
  storageBucket: "merlin-infraspace-rmc.firebasestorage.app",
  messagingSenderId: "927806621772",
  appId: "1:927806621772:web:c10ecb5c8d766597224ce9"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);