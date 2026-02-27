import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCwC6xV1pjxKDPZ9ACSYkuz9AbgArvPdvQ",
  authDomain: "merlin-infraspace-rmc.firebaseapp.com",
  projectId: "merlin-infraspace-rmc",
  storageBucket: "merlin-infraspace-rmc.firebasestorage.app",
  messagingSenderId: "927806621772",
  appId: "1:927806621772:web:c10ecb5c8d766597224ce9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);