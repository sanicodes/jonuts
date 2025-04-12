// js/utils.js

export function formatPrice(price) {
  // Ensure price is a number before formatting
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) {
    console.warn("formatPrice received non-numeric value:", price);
    return "₱--.--"; // Return a placeholder or handle error appropriately
  }
  return `₱${numericPrice.toFixed(2)}`;
}


export function generateStars(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? "⭐" : "☆";
  }
  return stars;
}
