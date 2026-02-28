import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function checkRole(requiredRole) {
  const email = localStorage.getItem("userEmail");

  if (!email) {
    window.location.href = "index.html";
    return;
  }

  const userRef = doc(db, "users", email);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    alert("User not found");
    window.location.href = "index.html";
    return;
  }

  const role = userSnap.data().role;

  if (role !== requiredRole) {
    alert("Access Denied");
    window.location.href = "index.html";
  }
}