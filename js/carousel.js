import { testimonialData } from './data.js'; // Need length

let currentSlide = 0;
let autoPlayInterval = null;
const slideInterval = 5000; // ms

const carouselContainer = document.getElementById("testimonialCarousel");
const indicatorsContainer = document.getElementById("carouselIndicators");

function updateCarouselPosition() {
  if (!carouselContainer || !indicatorsContainer) return;

  const totalSlides = testimonialData.length;
  if (totalSlides === 0) return;

  // Ensure currentSlide is within bounds (useful if data changes)
  currentSlide = (currentSlide + totalSlides) % totalSlides;

  carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update active dot indicator
  const dots = indicatorsContainer.querySelectorAll(".carousel-dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

export function moveCarousel(direction) {
  const totalSlides = testimonialData.length;
  if (totalSlides <= 1) return; // No need to move if 0 or 1 slide

  currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
  updateCarouselPosition();
  resetAutoPlay(); // Reset timer on manual interaction
}

export function goToSlide(slideIndex) {
  const totalSlides = testimonialData.length;
  if (slideIndex >= 0 && slideIndex < totalSlides) {
    currentSlide = slideIndex;
    updateCarouselPosition();
    resetAutoPlay(); // Reset timer on manual interaction
  } else {
    console.warn("Invalid slide index:", slideIndex);
  }
}

function startAutoPlay() {
  stopAutoPlay(); // Clear existing interval first
  if (testimonialData.length > 1) {
    autoPlayInterval = setInterval(() => {
      moveCarousel(1); // Move forward
    }, slideInterval);
  }
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = null;
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// Initialize carousel position and start autoplay
export function initCarousel() {
  updateCarouselPosition(); // Set initial position
  startAutoPlay();
}

// Add listeners for prev/next buttons (assuming they have IDs 'prevButton' and 'nextButton')
export function setupCarouselButtons() {
  const prevButton = document.getElementById('prevButton'); // Make sure this ID exists in your HTML
  const nextButton = document.getElementById('nextButton'); // Make sure this ID exists in your HTML

  if (prevButton) {
    prevButton.addEventListener('click', () => moveCarousel(-1));
  }
  if (nextButton) {
    nextButton.addEventListener('click', () => moveCarousel(1));
  }
}
