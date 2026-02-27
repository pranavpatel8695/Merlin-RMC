export function showCreditPopup(customer) {
  if (customer.overdueDays > 0) {
    alert(
      `PAYMENT REMINDER\n\nCustomer: ${customer.name}\nOverdue By: ${customer.overdueDays} days`
    );
  }
}