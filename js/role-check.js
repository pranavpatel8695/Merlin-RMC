import { auth, db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export function checkRole(requiredRole) {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = "index.html";
    } else {
      const snap = await getDoc(doc(db, "users", user.uid));
      const role = snap.data().role;

      if (role !== requiredRole) {
        window.location.href = "index.html";
      }
    }
  });
}