import { menuData, testimonialData, aboutUsData } from "./data.js";
import { formatPrice, generateStars } from "./utils.js";
import { addToCart } from "./cart.js"; // Need this for menu item buttons
import { goToSlide } from "./carousel.js"; // Need this for carousel dots
import { setupScrollAnimations } from "./ui.js"; // To re-run after rendering carousel

export function renderMenuItems(category, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !menuData[category]) {
    console.error(
      `Menu container #${containerId} or category ${category} not found.`
    );
    return;
  }

  let html = "";
  menuData[category].forEach((item) => {
    const tagsHtml =
      item.tags && item.tags.length > 0
        ? item.tags
            .map((tag) => `<span class="menu-item-tag">${tag}</span>`)
            .join(" ")
        : "";
    // Add data attributes for name and price
    html += `
            <div class="menu-item-card animate-on-scroll">
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${
      item.name
    }" class="menu-item-img">
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <span class="menu-item-price">${formatPrice(
                          item.price
                        )}</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    <div class="menu-item-tags">
                        ${tagsHtml}
                    </div>
                    <div class="menu-item-actions">
                        <button class="menu-item-button" data-name="${
                          item.name
                        }" data-price="${item.price}">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
  });
  container.innerHTML = html;

  // Add event listeners AFTER rendering the HTML
  addMenuItemListeners(containerId);
}

function addMenuItemListeners(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.querySelectorAll(".menu-item-button").forEach((button) => {
    // Important: Use a fresh query inside the listener or store data
    button.addEventListener("click", (event) => {
      const targetButton = event.currentTarget; // Use currentTarget
      const name = targetButton.dataset.name;
      const price = parseFloat(targetButton.dataset.price);
      if (name && !isNaN(price)) {
        addToCart(name, price);
      } else {
        console.error("Missing name or price on button:", targetButton);
      }
    });
  });
}

export function renderTestimonialsCarousel(carouselId, indicatorsId) {
  const carouselContainer = document.getElementById(carouselId);
  const indicatorsContainer = document.getElementById(indicatorsId);

  if (!carouselContainer || !indicatorsContainer) {
    console.error("Testimonial carousel or indicators container not found.");
    return;
  }

  carouselContainer.innerHTML = ""; // Clear previous content
  indicatorsContainer.innerHTML = "";

  testimonialData.forEach((testimonial, index) => {
    // Create slide
    const slide = document.createElement("div");
    slide.classList.add("carousel-slide");
    // IMPORTANT: Wrap the card in animate-on-scroll here if needed
    slide.innerHTML = `
           <div class="animate-on-scroll">
             <div class="testimonial-card">
                 <p class="testimonial-quote">"${testimonial.quote}"</p>
                 <div>
                     <p class="testimonial-author"><b>- ${
                       testimonial.author
                     }</b></p>
                     <p class="testimonial-rating">${generateStars(
                       testimonial.rating
                     )}</p>
                 </div>
             </div>
           </div>
        `;
    carouselContainer.appendChild(slide);

    // Create indicator dot
    const dot = document.createElement("span");
    dot.classList.add("carousel-dot");
    dot.dataset.index = index; // Store index for the listener
    if (index === 0) dot.classList.add("active");
    indicatorsContainer.appendChild(dot);
  });

  // Add listeners to dots AFTER they are in the DOM
  indicatorsContainer.querySelectorAll(".carousel-dot").forEach((dot) => {
    dot.addEventListener("click", (event) => {
      const index = parseInt(event.target.dataset.index, 10);
      goToSlide(index);
    });
  });

  // Re-setup scroll animations for the newly added elements
  // Ensure setupScrollAnimations is imported and defined correctly in ui.js
  if (typeof setupScrollAnimations === "function") {
    setupScrollAnimations();
  } else {
    console.warn(
      "setupScrollAnimations function not available for carousel rendering."
    );
  }
}

export function renderAboutUs(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("About Us container not found:", containerId);
    return;
  }

  let html = "";
  aboutUsData.forEach((member) => {
    html += `
            <div class="team-member-card animate-on-scroll">
                <div class="team-member-image">
                    <img src="${member.image}" alt="Photo of ${member.name}">
                </div>
                <div class="team-member-info">
                    <h3 class="team-member-name">${member.name}</h3>
                    <p class="team-member-role">${member.role}</p>
                    <p class="team-member-bio">${member.bio}</p>
                </div>
            </div>
        `;
  });
  container.innerHTML = html;
  // Scroll animations will be handled globally or specifically triggered if needed
}
