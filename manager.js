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

  const today = new Date();

  snapshot.forEach(doc => {
    const data = doc.data();

    // Safe credit number
    const creditDays = Number(data.creditDays);

    // Safe timestamp handling
    let createdDate;
    if (data.createdAt && data.createdAt.toDate) {
      createdDate = data.createdAt.toDate();
    } else {
      createdDate = new Date(data.createdAt);
    }

    const diffTime = today.getTime() - createdDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const overdueDays = diffDays - creditDays;

    if (overdueDays > 0) {
      alert(
        `⚠ PAYMENT REMINDER\n\nCustomer: ${data.name}\nOverdue By: ${overdueDays} days\n\nAsk Manager to remind customer.`
      );
    }

    listDiv.innerHTML += `
      <p>
        <strong>${data.name}</strong> - Credit: ${creditDays} Days 
        ${overdueDays > 0 ? `<span style="color:red;">(Overdue ${overdueDays} days)</span>` : ""}
      </p>
    `;
  });
}

loadCustomers();