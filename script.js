// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Utility functions
function getCartFromStorage() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function saveCartToStorage(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Add event listeners for all Add to Cart buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// Render cart items
function renderCart() {
  cartList.innerHTML = "";
  const cart = getCartFromStorage();
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    const cart = getCartFromStorage();
    cart.push(product); // allow duplicates
    saveCartToStorage(cart);
    renderCart();
  }
}

// Remove one instance of a product from cart (if implemented)
function removeFromCart(productId) {
  let cart = getCartFromStorage();
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    saveCartToStorage(cart);
    renderCart();
  }
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Event listener for clear button
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
