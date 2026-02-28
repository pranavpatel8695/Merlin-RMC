import { db } from "./firebase-config.js";
import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const customerCollection = collection(db, "customers");

window.addCustomer = async function () {
  const name = document.getElementById("custName").value;
  const creditDays = document.getElementById("creditDays").value;

  if (!name || !creditDays) {
    alert("Please fill all fields");
    return;
  }

  await addDoc(customerCollection, {
    name: name,
    creditDays: Number(creditDays),
    createdAt: new Date()
  });

  alert("Customer Added");
  loadCustomers();
};

async function loadCustomers() {
  const snapshot = await getDocs(customerCollection);
  const listDiv = document.getElementById("customerList");
  listDiv.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    listDiv.innerHTML += `
      <p><strong>${data.name}</strong> - Credit: ${data.creditDays} Days</p>
    `;
  });
}

loadCustomers();