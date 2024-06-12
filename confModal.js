document.addEventListener('DOMContentLoaded', function () {
    const checkoutForm = document.getElementById('checkout-form');
    const orderModalElement = document.getElementById('orderModal');
    const orderNumberSpan = document.getElementById('orderNumber');
    const customerNameSpan = document.getElementById('customerName');

    // Check if the orderModal element exists
    if (orderModalElement) {
      const orderModal = new bootstrap.Modal(orderModalElement);

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
      });

      // Reset the form after the modal is closed
      orderModalElement.addEventListener('hidden.bs.modal', function(event) {
        // Check if the event is specifically for the 'hidden.bs.modal' event
        if (event.target === orderModalElement && event.type === 'hidden.bs.modal') {
          checkoutForm.reset();
        }
      });

      // Manual trigger button event listener
      document.getElementById('manualTriggerBtn').addEventListener('click', function() {
        orderModal.show(); // Manually show the modal
      });
    }
  });