var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

// Display cart items
function displayCartItems(container, cartItems) {
  container.innerHTML = ''; 

  cartItems.forEach(item => {
    const cartItem = createCartItem(item);
    container.appendChild(cartItem);
  });
}

// Display total cost
function displayTotalCost(container, totalCost) {
  container.textContent = `Total: $${totalCost.toFixed(2)}`;
}

// Event listeners to "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// To add a product to the cart
function addToCart(event) {
    const product = event.target.closest('.product');
    const productInfo = {
      name: product.querySelector('.product-name').textContent,
      price: parseFloat(product.querySelector('.product-price').textContent.replace('$', '')),
      image: product.querySelector('.card-img-top').src,
    };
  
    const existingCartItem = document.querySelector(`.cart-item[data-product-name="${productInfo.name}"]`);
  
    if (existingCartItem) {
      const quantityInput = existingCartItem.querySelector('.quantity-input');
      quantityInput.value = parseInt(quantityInput.value) + 1;
    } else {
      const cartItem = createCartItem(productInfo);
      cartItem.dataset.productName = productInfo.name;
      const cartItemsContainer = document.querySelector('.cart-items');
      cartItemsContainer.appendChild(cartItem);
    }
    showModal(productInfo.image, `${productInfo.name} added to cart!`);
    updateCartTotal();
    showCart();
  }
  
  function showCart() {
    const cart = document.getElementById('shopping-cart');
    cart.style.display = 'block';
  }
  
// Function to create a cart item element
function createCartItem(productInfo) {
  const cartItem = document.createElement('p');
  cartItem.classList.add('cart-item', 'd-flex', 'align-items-center', 'ml-3');
  cartItem.dataset.productName = productInfo.name;

  const productImage = document.createElement('img');
  productImage.src = productInfo.image;
  productImage.alt = productInfo.name;
  productImage.classList.add('me-0', 'img-fluid', 'cart-img'); // Apply the new class here

  const productDetails = document.createElement('div');

  const productName = document.createElement('p');
  productName.classList.add('product-name');
  productName.textContent = productInfo.name;

  const productPrice = document.createElement('p');
  productPrice.classList.add('product-price');
  productPrice.textContent = `$${productInfo.price}`;

  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityInput.classList.add('quantity-input', 'form-control');
  quantityInput.addEventListener('change', updateCartTotal);

  const removeButton = document.createElement('span');
  removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'm-2');

  const removeIcon = document.createElement('i');
  removeIcon.classList.add('fas', 'fa-trash-alt');

  removeButton.appendChild(removeIcon);
  removeButton.addEventListener('click', removeFromCart);

  const plusButton = document.createElement('span');
  plusButton.classList.add('btn', 'btn-danger', 'btn-sm', 'btn-dark', 'm-2');

  const plusIcon = document.createElement('i');
  plusIcon.textContent = '\u002B';

  plusButton.appendChild(plusIcon);
  plusButton.addEventListener('click', plusOnetoCart);

  const minusButton = document.createElement('span');
  minusButton.classList.add('btn', 'btn-danger', 'btn-sm', 'btn-dark', 'm-2');

  const minusIcon = document.createElement('i');
  minusIcon.textContent = '\u2212';

  minusButton.appendChild(minusIcon);
  minusButton.addEventListener('click', minusOnetoCart);

  productDetails.appendChild(productName);
  productDetails.appendChild(productPrice);
  productDetails.appendChild(quantityInput);
  productDetails.appendChild(plusButton);
  productDetails.appendChild(minusButton);
  productDetails.appendChild(removeButton);

  cartItem.appendChild(productImage);
  cartItem.appendChild(productDetails);

  return cartItem;
}


// Function to update the cart total
function updateCartTotal() {
  const cartItems = document.querySelectorAll('.cart-item');
  let total = 0;
  cartItems.forEach(item => {
    const price = parseFloat(item.querySelector('.product-price').textContent.replace('$', ''));
    const quantity = parseInt(item.querySelector('.quantity-input').value);
    total += price * quantity;
  });
  document.querySelector('.cart-total').textContent = `Total: $${total.toFixed(2)}`;
}

// Function to remove a product from the cart
function removeFromCart(event) {
  const cartItem = event.target.closest('.cart-item');
  cartItem.remove();
  updateCartTotal();
}

// Function to Increase a product item in the cart
function plusOnetoCart(event) {
  const cartItem = event.target.closest('.cart-item');
  if (cartItem) {
    const quantityInput = cartItem.querySelector('.quantity-input');
    quantityInput.value = parseInt(quantityInput.value) + 1;
    updateCartTotal();
  }
}

// Function to decrease a product item in the cart
function minusOnetoCart(event) {
  const cartItem = event.target.closest('.cart-item');
  if (cartItem) {
    const quantityInput = cartItem.querySelector('.quantity-input');
    const currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
      quantityInput.value = currentQuantity - 1;
      updateCartTotal();
    }
  }
}

// Calculate total cost of cart items
function calculateTotalCost(cartItems) {
  let totalCost = 0;

  // Loop through each cart item and add the price to the total cost
  for (const item of cartItems) {
    totalCost += item.price * item.quantity;
  }
  return totalCost;
}

// Get cart items & calculate total cost!!
const cartItems = [/* ... */];
const totalCost = calculateTotalCost(cartItems);

// Display the cart items & total cost
const cartItemsContainer = document.querySelector('.cart-items');
const totalCostContainer = document.querySelector('.cart-total');
displayCartItems(cartItemsContainer, cartItems);
displayTotalCost(totalCostContainer, totalCost);

// Handle form submission
const checkoutForm = document.getElementById('checkout-form');
checkoutForm.addEventListener('submit', handleCheckout);

function handleCheckout(event) {
  event.preventDefault();
}


const modal = document.getElementById('popupModal');
const closeBtn = document.querySelector('.close');

// To show modal after adding an item to the cart
function showModal(imageSrc, message) {
  const popupMessage = document.getElementById('popupMessage');
  popupMessage.innerHTML = ''; // Clear previous content

  // Set the product image
  const productImage = document.querySelector('.modal-content img.imageSrc');
  productImage.classList.add('imageSrc', 'container-fluid');
  productImage.src = imageSrc;
  productImage.alt = 'Product Image';

  // Create and append the message text
  const messageText = document.createElement('p');
  messageText.textContent = message;
  popupMessage.appendChild(messageText);

  // Check if the cart icon already exists
  if (!document.querySelector('.cart-icon')) {
    // Create the cart icon element
    const cartIcon = document.createElement('i');
    cartIcon.classList.add('fa-solid', 'fa-cart-shopping', 'cart-icon');
    popupMessage.appendChild(cartIcon);
  }

  // Show the modal
  modal.style.display = 'block';
}

// Close the modal when clicking on (x)
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close the modal if clicked outside of it
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


 // Get the scroll buttons container and buttons
 document.addEventListener('DOMContentLoaded', function () {
  const scrollButtonsContainer = document.getElementById('scrollButtonsContainer');
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const scrollToBottomBtn = document.getElementById('scrollToBottomBtn');
  let hideTimeout;

  function toggleScrollButtons() {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const bottomOffset = document.body.offsetHeight - windowHeight;

      if (scrollPosition > windowHeight / 2) {
          showScrollButtons();
      } else {
          hideScrollButtons();
      }

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          scrollToBottomBtn.style.opacity = '0';
          scrollToBottomBtn.style.pointerEvents = 'none';
      } else {
          scrollToBottomBtn.style.opacity = '1';
          scrollToBottomBtn.style.pointerEvents = 'auto';
      }
  }

  function showScrollButtons() {
      clearTimeout(hideTimeout);
      scrollButtonsContainer.classList.add('show');
      hideTimeout = setTimeout(hideScrollButtons, 3000);
  }

  function hideScrollButtons() {
      scrollButtonsContainer.classList.remove('show');
  }

  window.addEventListener('scroll', toggleScrollButtons);

  scrollToTopBtn.addEventListener('click', function () {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  scrollToBottomBtn.addEventListener('click', function () {
      window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
      });
  });

  toggleScrollButtons();
});

document.addEventListener('DOMContentLoaded', () => {
    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    const creditCardDetails = document.querySelector('.credit-card-details');
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    const checkoutForm = document.getElementById('checkout-form');
  
    // Function to show error message
    function showError(input, message) {
      const formControl = input.parentElement;
      const errorMessage = formControl.querySelector('.invalid-feedback');
      errorMessage.textContent = message;
      formControl.classList.add('was-validated');
    }
  
    // Function to show error message
function showError(input, message) {
  const formControl = input.parentElement;
  const errorMessage = formControl.querySelector('.invalid-feedback');
  errorMessage.textContent = message;
  formControl.classList.add('was-validated');
}

// Function to validate credit card details
function validateCreditCard() {
  const cardNumber = cardNumberInput.value.trim();
  const expiryDate = expiryDateInput.value.trim();
  const cvv = cvvInput.value.trim();

  // Validate card number
  if (cardNumber === '' || isNaN(cardNumber) || cardNumber.length < 13 || cardNumber.length > 19) {
    showError(cardNumberInput, 'Please enter a valid card number.');
    return false;
  }

  // Validate expiry date (MM/YY)
  const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!expiryRegex.test(expiryDate)) {
    showError(expiryDateInput, 'Please enter a valid expiry date (MM/YY).');
    return false;
  } else {
    const [month, year] = expiryDate.split('/').map(Number);
    const now = new Date();
    const expiry = new Date(`20${year}`, month - 1);
    if (expiry <= now) {
      showError(expiryDateInput, 'The expiry date must be in the future.');
      return false;
    }
  }

  // Validate CVV
  if (cvv === '' || isNaN(cvv) || (cvv.length !== 3 && cvv.length !== 4)) {
    showError(cvvInput, 'Please enter a valid CVV.');
    return false;
  }

  return true;
}
  
    // Event listener for payment method radios
    paymentMethodRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'creditCard') {
          creditCardDetails.style.display = 'block';
        } else {
          creditCardDetails.style.display = 'none';
        }
      });
    });
  
    // Event listener for form submission
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
  
      if (selectedPaymentMethod === 'creditCard' && !validateCreditCard()) {
        return; // Stop form submission if credit card details are invalid
      }
  
      // Form is valid, proceed with submission
      console.log('Form submitted successfully!');
    });
  });
  