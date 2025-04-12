import { getCartLength, clearCart, updateCartDisplay, getCartTotalFormatted } from './cart.js';

// --- Navbar Scroll Effect ---
export function setupNavbarScroll() {
  const navbar = document.querySelector(".top-nav");
  if (!navbar) return;

  const initialBg = navbar.style.backgroundColor || getComputedStyle(navbar).backgroundColor || "#1b1b1b"; // Store initial color
  const scrolledBg = "rgba(0, 0, 0, 0.9)";

  window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      navbar.style.backgroundColor = scrolledBg;
    } else {
      navbar.style.backgroundColor = initialBg;
    }
  });
}


// --- Menu Tabs ---
export function setupMenuTabs() {
  const tabLinks = document.querySelectorAll(".tab-container .tab-link-wrapper"); // Target the wrapper

  tabLinks.forEach(wrapper => {
    wrapper.addEventListener('click', (event) => {
      // Don't prevent default if it's a link, let it scroll if needed
      // event.preventDefault();

      const menuName = wrapper.dataset.menu; // Expecting <div class="tab-link-wrapper" data-menu="donutMenuContainer">
      if (!menuName) return;

      // Hide all menu content sections
      document.querySelectorAll(".menu-content").forEach(content => {
        content.style.display = "none";
      });

      // Remove active class from all tab links (the inner div)
      document.querySelectorAll(".tab-container .tablink").forEach(link => {
        link.classList.remove("active");
      });

      // Show the target menu content
      const menuElement = document.getElementById(menuName);
      if (menuElement) {
        menuElement.style.display = "block";
      }

      // Add active class to the clicked tab's inner div
      const tablinkDiv = wrapper.querySelector(".tablink");
      if (tablinkDiv) {
        tablinkDiv.classList.add("active");
      }
    });
  });

  // Activate the default tab initially
  const defaultOpenWrapper = document.getElementById("defaultOpen")?.closest('.tab-link-wrapper');
  if (defaultOpenWrapper) {
    defaultOpenWrapper.click(); // Simulate a click to open it
  } else {
    // Fallback: Open the first tab if defaultOpen isn't found
    const firstTabWrapper = document.querySelector(".tab-container .tab-link-wrapper");
    if (firstTabWrapper) {
      firstTabWrapper.click();
    }
  }
}

// --- Scroll Animations (Intersection Observer) ---
let observer = null;
export function setupScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% visible
  };

  const observerCallback = (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Add specific animation classes based on element type if needed
        if (entry.target.closest(".testimonial-card")) {
          entry.target.classList.add("fade-in-up"); // Example animation
        } else if (entry.target.closest(".team-member-card")) {
          entry.target.classList.add("fade-in-up"); // Example animation
        } else {
          entry.target.classList.add("fade-in"); // Default fade-in
        }
        obs.unobserve(entry.target); // Stop observing once visible
      }
    });
  };

  // Disconnect previous observer if exists (useful for dynamic content loading)
  if (observer) observer.disconnect();

  observer = new IntersectionObserver(observerCallback, observerOptions);
  const elementsToAnimate = document.querySelectorAll(".animate-on-scroll");
  elementsToAnimate.forEach((el) => observer.observe(el));
}


// --- Active Navigation Link Highlighting ---
export function setupActiveLinkHighlighting() {
  const navLinks = document.querySelectorAll(".nav-links a");
  const contactButton = document.querySelector(".nav-cta a.contact-button");
  const allNavItems = [...navLinks, ...(contactButton ? [contactButton] : [])]; // Combine NodeLists safely

  function removeActiveClasses() {
    allNavItems.forEach(item => item.classList.remove("active-link"));
  }

  allNavItems.forEach(item => {
    item.addEventListener('click', function() {
      removeActiveClasses(); // Remove from all first
      this.classList.add('active-link'); // Add to the clicked one
      // NOTE: The browser's default behavior will handle the scrolling to the href="#section"
    });
  });

  // Optional: Set initial active link based on current view or hash (more complex)
  // For simplicity, we'll just handle clicks for now.
}

// --- Mobile Menu Toggle ---
export function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle"); // Hamburger button
  const navCollapsible = document.getElementById("navCollapsible"); // The menu container

  if (!menuToggle || !navCollapsible) return;

  menuToggle.addEventListener('click', () => {
    navCollapsible.classList.toggle("mobile-menu-open");

    // Change icon: Hamburger or X
    if (navCollapsible.classList.contains("mobile-menu-open")) {
      menuToggle.innerHTML = "&times;"; // 'X' symbol
    } else {
      menuToggle.innerHTML = "&#9776;"; // Hamburger symbol
    }
  });

  // Close menu when a link *inside* it is clicked
  navCollapsible.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapsible.classList.contains("mobile-menu-open")) {
        navCollapsible.classList.remove("mobile-menu-open");
        menuToggle.innerHTML = "&#9776;"; // Reset hamburger icon
      }
    });
  });
}


// --- Modal Logic ---
let checkoutModal;
let closeModalButton;
let modalTrackingNumberSpan;
let modalTotalAmountSpan;
let modalOkButton;
let sideCartPanel; // Get panel reference for hiding after checkout
let closeSideCartButton; // Get button ref

function handleCheckout() {
  if (getCartLength() === 0) {
    alert("Your cart is empty. Add some delicious items before checking out!");
    return;
  }

  const timestamp = Date.now();
  const trackingNumber = `JONUTS-${timestamp.toString().slice(-6)}`;
  const totalAmount = getCartTotalFormatted(); // Use function from cart.js

  if (modalTrackingNumberSpan) modalTrackingNumberSpan.textContent = trackingNumber;
  if (modalTotalAmountSpan) modalTotalAmountSpan.textContent = totalAmount;

  if (checkoutModal) {
    checkoutModal.style.display = "flex"; // Or "block", depending on CSS
  } else {
    // Fallback if modal elements aren't found
    alert(`Checkout Submitted!\nTracking Number: ${trackingNumber}\nTotal: ${totalAmount}`);
  }

  clearCart(); // Clear cart data using the function from cart.js
  // updateCartDisplay is called by clearCart

  if (sideCartPanel) {
    sideCartPanel.classList.remove("is-visible"); // Hide side cart
  }
}

function closeModal() {
  if (checkoutModal) {
    checkoutModal.style.display = "none";
  }
}

export function setupModals() {
  checkoutModal = document.getElementById("checkoutModal");
  closeModalButton = document.getElementById("closeModalButton"); // The 'X'
  modalTrackingNumberSpan = document.getElementById("modalTrackingNumber");
  modalTotalAmountSpan = document.getElementById("modalTotalAmount");
  modalOkButton = document.getElementById("modalOkButton"); // The 'OK' button
  sideCartPanel = document.getElementById("sideCartPanel"); // Needed for checkout
  closeSideCartButton = document.getElementById("closeSideCartButton"); // Close button for side panel

  const checkoutButton = document.getElementById("checkoutButton"); // Button in the side cart

  // --- Event Listeners ---

  // Checkout button in the side cart panel
  if (checkoutButton) {
    checkoutButton.addEventListener('click', handleCheckout);
  } else {
    console.error("Checkout button ('checkoutButton') not found!");
  }

  // Close button (X) for the side cart panel
  if (closeSideCartButton) {
    closeSideCartButton.addEventListener('click', () => {
      if (sideCartPanel) {
        sideCartPanel.classList.remove("is-visible");
      }
    });
  } else {
    console.error("Close button ('closeSideCartButton') for side cart not found");
  }

  // Close button (X) for the checkout success modal
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }

  // OK button for the checkout success modal
  if (modalOkButton) {
    modalOkButton.addEventListener('click', closeModal);
  }

  // Clicking outside the checkout success modal content closes it
  window.addEventListener('click', (event) => {
    if (event.target === checkoutModal) { // If the click target is the modal background itself
      closeModal();
    }
  });
}
