import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function checkRole(requiredRole) {
  const email = localStorage.getItem("userEmail");

  console.log("Logged Email:", email);

  if (!email) {
    alert("Not logged in");
    window.location.href = "index.html";
    return;
  }

  const userRef = doc(db, "users", email);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    alert("User document not found in Firestore");
    return;
  }

  const role = userSnap.data().role;

  console.log("User Role:", role);

  if (role !== requiredRole) {
    alert("Access Denied. Role mismatch.");
    return;
  }

  console.log("Access Granted");
}