const checkoutForm = document.getElementById('checkout-form');
const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
const orderNumberSpan = document.getElementById('orderNumber');
const customerNameSpan = document.getElementById('customerName');

function generateRandomNumber() {
  let randomNum = Math.floor(Math.random() * 900000000) + 100000000;
  return randomNum.toString();
}

checkoutForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  const name = document.querySelector('input[placeholder="First Name"]').value;
  const address = document.querySelector('input[placeholder="Address"]').value;

  // Perform any necessary validation or processing here

  // Generate a unique order number
  const orderNumber = generateRandomNumber();

  // Update the order number in the modal
  orderNumberSpan.textContent = orderNumber;
  customerNameSpan.textContent = name; 

  // Show the order confirmation modal
  orderModal.show();

  // Reset the form after the modal is closed
  orderModal._element.addEventListener('hidden.bs.modal', function() {
    checkoutForm.reset();
    window.location.reload();

  });
});
