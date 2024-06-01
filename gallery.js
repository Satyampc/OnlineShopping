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
    price: product.querySelector('.product-price').textContent.replace('$', ''),
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
  showModal(`${productInfo.name} added to cart!`);
  updateCartTotal();

  // Scroll to the cart section
  document.getElementById('cart-section').scrollIntoView({ behavior: 'smooth' });
}

  
// Function to create a cart item element
function createCartItem(productInfo) {
  const cartItem = document.createElement('div');
  cartItem.classList.add('cart-item', 'd-flex', 'align-items-center', 'mb-3');
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

  // Function to show the modal with a message
  function showModal(message) {
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.textContent = message;
    modal.style.display = 'block';
  }

  // Close the modal when the <span> (x) is clicked
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close the modal if user clicks outside of it
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });