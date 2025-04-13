import { updateCartDisplay, toggleCartPanel } from "./cart.js";
import {
  renderMenuItems,
  renderAboutUs,
  renderTestimonialsCarousel,
} from "./render.js";
import { initCarousel, setupCarouselButtons } from "./carousel.js";
import {
  setupNavbarScroll,
  setupMenuTabs,
  setupScrollAnimations,
  setupActiveLinkHighlighting,
  setupMobileMenu,
  setupModals,
} from "./ui.js";
import { resetGame, prepareGame, setupGameButtons } from "./game.js";

// --- Run Setup Functions when DOM is Ready ---
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Loaded. Initializing App...");

  // 1. Render Dynamic Content
  try {
    renderMenuItems("donuts", "donutMenuContainer");
    renderMenuItems("drinks", "drinkMenuContainer");
    renderMenuItems("breads", "breadMenuContainer");
    renderMenuItems("specialties", "specialtiesMenuContainer");
    renderAboutUs("aboutUsContainer");
    renderTestimonialsCarousel("testimonialCarousel", "carouselIndicators");
  } catch (error) {
    console.error("Error during initial rendering:", error);
  }

  // 2. Initialize or Setup UI Components & Interactions
  try {
    setupNavbarScroll();
    setupMenuTabs(); // This also handles opening the default tab
    setupActiveLinkHighlighting();
    setupMobileMenu();
    setupModals(); // Sets up checkout modal AND side cart close button listeners
    initCarousel(); // Set initial carousel position and start autoplay
    setupCarouselButtons(); // Add listeners for prev/next
    resetGame(); // Set initial game state (score 0, buttons ready)
    setupGameButtons(); // Add listeners for start/stop game buttons
    updateCartDisplay(); // Show initial cart state (likely empty)

    // Add listener for the floating cart button/toggle
    const cartFloatingButton = document.getElementById("cartFloatingButton");
    if (cartFloatingButton) {
      cartFloatingButton.addEventListener("click", toggleCartPanel);
    } else {
      console.warn("Floating cart button ('cartFloatingButton') not found.");
    }

    // Add listener for the 'Game' navigation link (if you have one)
    // Example: Assuming a link <a href="#game" id="navGameLink">Game</a>
    const navGameLink = document.getElementById("navGameLink");
    if (navGameLink) {
      navGameLink.addEventListener("click", (e) => {
        // Optional: prevent default if you only want to run JS
        // e.preventDefault();
        prepareGame(); // Prepare the game section when nav link is clicked
      });
    }

    // Initial call to setup scroll animations for elements present on load
    // (Carousel rendering might call this again for its specific items)
    setupScrollAnimations();
  } catch (error) {
    console.error("Error during UI setup:", error);
  }

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      alert("message has been sent, Thank you for your reservation!");
    });
  } else {
    console.error("Contact form with ID 'contactForm' not found.");
  }

  console.log("App Initialized.");
}); // End DOMContentLoaded
