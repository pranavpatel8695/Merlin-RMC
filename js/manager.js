import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const customerCollection = collection(db, "customers");
const supplyCollection = collection(db, "supplies");
const paymentCollection = collection(db, "payments");

// =====================
// ADD CUSTOMER
// =====================
window.addCustomer = async function() {
  const name = document.getElementById("custName").value;
  const creditDays = document.getElementById("creditDays").value;

  if (!name || !creditDays) {
    alert("Fill all fields");
    return;
  }

  await addDoc(customerCollection, {
    name,
    creditDays: Number(creditDays)
  });

  alert("Customer Added");
  loadCustomers();
};

// =====================
// LOAD CUSTOMERS
// =====================
async function loadCustomers() {
  const snapshot = await getDocs(customerCollection);
  const listDiv = document.getElementById("customerList");
  listDiv.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    const id = doc.id;

    listDiv.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">
        <strong>${data.name}</strong> - Credit: ${data.creditDays} Days
        <br><br>
        <button onclick="addSupply('${id}')">Add Supply</button>
        <button onclick="addPayment('${id}')">Add Payment</button>
        <button onclick="viewLedger('${id}')">View Ledger</button>

        <div id="ledger-${id}" style="margin-top:15px;"></div>
      </div>
    `;
  });
}

// =====================
// ADD SUPPLY
// =====================
window.addSupply = async function(customerId) {
  const amount = prompt("Enter Supply Amount:");
  if (!amount) return;

  await addDoc(supplyCollection, {
    customerId,
    amount: Number(amount),
    date: new Date()
  });

  alert("Supply Added");
};

// =====================
// ADD PAYMENT
// =====================
window.addPayment = async function(customerId) {
  const amount = prompt("Enter Payment Amount:");
  if (!amount) return;

  await addDoc(paymentCollection, {
    customerId,
    amount: Number(amount),
    date: new Date()
  });

  alert("Payment Added");
};

// =====================
// VIEW LEDGER
// =====================
window.viewLedger = async function(customerId) {
  const ledgerDiv = document.getElementById("ledger-" + customerId);
  ledgerDiv.innerHTML = "Loading...";

  const supplyQuery = query(supplyCollection, where("customerId", "==", customerId));
  const paymentQuery = query(paymentCollection, where("customerId", "==", customerId));

  const supplySnap = await getDocs(supplyQuery);
  const paymentSnap = await getDocs(paymentQuery);

  let entries = [];

  supplySnap.forEach(doc => {
    const d = doc.data();
    entries.push({
      type: "Supply",
      amount: d.amount,
      date: d.date.toDate()
    });
  });

  paymentSnap.forEach(doc => {
    const d = doc.data();
    entries.push({
      type: "Payment",
      amount: d.amount,
      date: d.date.toDate()
    });
  });

  entries.sort((a, b) => a.date - b.date);

  let balance = 0;
  let totalDebit = 0;
  let totalCredit = 0;

  let html = `
    <table border="1" cellpadding="5" style="width:100%;">
      <tr>
        <th>Date</th>
        <th>Particular</th>
        <th>Debit</th>
        <th>Credit</th>
        <th>Balance</th>
      </tr>
  `;

  entries.forEach(e => {
    if (e.type === "Supply") {
      balance += e.amount;
      totalDebit += e.amount;
    } else {
      balance -= e.amount;
      totalCredit += e.amount;
    }

    html += `
      <tr>
        <td>${e.date.toLocaleDateString()}</td>
        <td>${e.type}</td>
        <td>${e.type === "Supply" ? e.amount : ""}</td>
        <td>${e.type === "Payment" ? e.amount : ""}</td>
        <td>${balance}</td>
      </tr>
    `;
  });

  html += `
    </table>
    <br>
    <strong>Total Debit:</strong> ${totalDebit} <br>
    <strong>Total Credit:</strong> ${totalCredit} <br>
    <strong>Outstanding:</strong> ${balance}
  `;

  ledgerDiv.innerHTML = html;
};

// Load on page start
loadCustomers();