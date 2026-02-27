import { auth, db } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, "users", uid));
    const role = userDoc.data().role;

    if (role === "admin") window.location.href = "admin.html";
    if (role === "manager") window.location.href = "manager.html";
    if (role === "operator") window.location.href = "operator.html";

  } catch (error) {
    alert("Login Failed: " + error.message);
  }
};