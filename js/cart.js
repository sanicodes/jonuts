import { formatPrice } from './utils.js';

let cart = []; // Internal cart state

const sideCartPanel = document.getElementById("sideCartPanel");
const cartContainer = document.getElementById("cartItemsContainer");
const cartTotalElement = document.getElementById("cartTotal");
const cartItemCountElement = document.getElementById("cartItemCount");
const cartToggleButton = document.getElementById("cartToggleButton"); // For feedback

// --- Core Cart Logic ---

export function addToCart(name, price) {
  if (typeof name !== 'string' || typeof price !== 'number' || isNaN(price)) {
    console.error("Invalid item data passed to addToCart:", name, price);
    return; // Prevent adding invalid items
  }
  const wasEmpty = cart.length === 0;
  const existingItemIndex = cart.findIndex((item) => item.name === name);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }

  updateCartDisplay();
  showCartFeedback(); // Give visual feedback

  // Show panel if it was empty and now isn't
  if (wasEmpty && cart.length > 0 && sideCartPanel) {
    sideCartPanel.classList.add("is-visible");
  }
}

function changeQuantity(name, change) {
  const itemIndex = cart.findIndex((item) => item.name === name);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += change;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1); // Remove item if quantity is zero or less
    }
  }
  updateCartDisplay();
  checkCartEmptyAndTogglePanel();
}

function removeFromCart(name) {
  cart = cart.filter((item) => item.name !== name);
  updateCartDisplay();
  checkCartEmptyAndTogglePanel();
}

export function clearCart() {
  cart = [];
  updateCartDisplay();
  checkCartEmptyAndTogglePanel();
}

// --- Cart Display and UI ---

export function updateCartDisplay() {
  if (!cartContainer || !cartTotalElement) {
    console.error("Cart container or total element not found!");
    return;
  }

  cartContainer.innerHTML = ""; // Clear previous items
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<p style="padding: 15px;">Your cart is currently empty.</p>';
  } else {
    cart.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");

      const itemSubtotal = item.price * item.quantity;
      total += itemSubtotal;

      // Use data attributes for names to handle potential special characters safely
      itemElement.innerHTML = `
              <div class="cart-item-details">
                  <span class="item-name">${item.name}</span><br>
                  <span class="item-price">${formatPrice(item.price)} each</span>
              </div>
              <div class="cart-item-actions">
                  <button data-name="${item.name}" class="quantity-change" data-change="-1">-</button>
                  <span>${item.quantity}</span>
                  <button data-name="${item.name}" class="quantity-change" data-change="1">+</button>
                  <button data-name="${item.name}" class="remove-item-btn">&times;</button>
               </div>
               <div style="min-width: 60px; text-align: right; font-weight: bold;">
                  ${formatPrice(itemSubtotal)}
              </div>
            `;
      cartContainer.appendChild(itemElement);
    });

    // Add event listeners after appending items
    addCartItemListeners();
  }

  cartTotalElement.textContent = formatPrice(total);
  updateCartItemCount(); // Update the bubble count
}

function addCartItemListeners() {
  if (!cartContainer) return;

  cartContainer.querySelectorAll('.quantity-change').forEach(button => {
    // Remove existing listener before adding a new one (safer if updateCartDisplay is called often)
    // Note: This requires storing the listener function if it's complex,
    // but for simple cases like this, re-adding is often okay.
    button.replaceWith(button.cloneNode(true)); // Simple way to remove all listeners
    const currentButton = cartContainer.querySelector(`[data-name="${button.dataset.name}"][data-change="${button.dataset.change}"]`); // Get the new button
    if (currentButton) {
      currentButton.addEventListener('click', (e) => {
        const name = e.target.dataset.name;
        const change = parseInt(e.target.dataset.change, 10);
        changeQuantity(name, change);
      });
    }
  });

  cartContainer.querySelectorAll('.remove-item-btn').forEach(button => {
    button.replaceWith(button.cloneNode(true)); // Remove old listeners
    const currentButton = cartContainer.querySelector(`.remove-item-btn[data-name="${button.dataset.name}"]`); // Get the new button
    if (currentButton) {
      currentButton.addEventListener('click', (e) => {
        const name = e.target.dataset.name;
        removeFromCart(name);
      });
    }
  });
}


function showCartFeedback() {
  if (cartToggleButton) {
    cartToggleButton.style.transform = "scale(1.2)";
    setTimeout(() => {
      cartToggleButton.style.transform = "scale(1)";
    }, 200);
  }
}

function updateCartItemCount() {
  if (!cartItemCountElement) return;

  let itemCount = 0;
  cart.forEach((item) => {
    itemCount += item.quantity;
  });

  cartItemCountElement.textContent = itemCount;
  if (itemCount > 0) {
    cartItemCountElement.classList.remove("hidden");
  } else {
    cartItemCountElement.classList.add("hidden");
  }
}

export function toggleCartPanel() {
  if (sideCartPanel) {
    sideCartPanel.classList.toggle("is-visible");
  }
}

function checkCartEmptyAndTogglePanel() {
  if (cart.length === 0 && sideCartPanel) {
    sideCartPanel.classList.remove("is-visible");
  }
}

// Export necessary functions for other modules
export function getCartLength() {
  return cart.length;
}

export function getCartTotalFormatted() {
  return cartTotalElement ? cartTotalElement.textContent : formatPrice(0);
}
