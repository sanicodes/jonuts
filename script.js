/* === script.js === */

// --- Data ---
const menuData = {
	donuts: [
		{ name: "Glazed", price: 50.00, description: "A classic coated with powdered sugar glaze.", image: "https://hips.hearstapps.com/hmg-prod/images/glazed-donut-recipe-1-65008ab2b45fb.jpg?crop=0.75xw:1xh;center,top&resize=1200:*", tags: [] },
		{ name: "Bavarian", price: 65.00, description: "A yeast donut filled with a light and airy Bavarian cream.", image: "https://i.ytimg.com/vi/A5eAJWahdJI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBLUBG2zrK7bh7eWK30dPX42h-ZnQ", tags: [] },
		{ name: "Chocolate Sprinkles", price: 70.00, description: "Original Glazed doughnut hand-dipped in dreamy chocolate icing with lots of sprinkles.", image: "https://mojo.generalmills.com/api/public/content/pEHpTfAJKUK1c6g3XMmcwg_webp_base.webp?v=1c943c90&t=191ddcab8d1c415fa10fa00a14351227", tags: [] },
		{ name: "Strawberry Sprinkles", price: 70.00, description: "Original Glazed doughnut hand-dipped in dreamy strawberry icing with lots of sprinkles.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Strawberry_donut_with_sprinkles_%282%29.jpg", tags: [] },
		{ name: "Triple Chocolate", price: 75.00, description: "Rich chocolate donut, chocolate filling, chocolate glaze.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1DXzpVFaOQNB8jdteBYe1E60KUUqJwLhwgg&s", tags: ["Hot!"] }
	],
	drinks: [
		{ name: "Coffee", price: 80.00, description: "Freshly brewed local beans.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAakbybdBpsb_aI0OKprF9GbkFTstaZAz-uQ&s", tags: [] },
		{ name: "Iced Tea", price: 60.00, description: "Refreshing house blend.", image: "https://realfood.tesco.com/media/images/RFO-1400x919-IcedTea-8e156836-69f4-4433-8bae-c42e174212c1-0-1400x919.jpg", tags: [] },
		{ name: "Milkshake", price: 120.00, description: "Choose from chocolate, vanilla, or strawberry.", image: "https://www.allrecipes.com/thmb/uzxCGTc-5WCUZnZ7BUcYcmWKxjo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-48974-vanilla-milkshake-hero-4x3-c815295c714f41f6b17b104e7403a53b.jpg", tags: [] }
	],
	breads: [
		{ name: "Ensaymada", price: 55.00, description: "Soft, sweet bread topped with butter, sugar, and cheese.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScJghPWHjiBiJiG-G9muHDkYmXdK66Ve_DOA&s", tags: [] },
		{ name: "Pan de Coco", price: 45.00, description: "Sweet roll filled with grated coconut.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjmcA5xQPUSTzmuUlbOI4orzoEXbUhHEWI_g&s", tags: [] }
	]
};

const testimonialData = [
	{ quote: "Absolutely the best donuts in Mandaue! Fresh, soft, and delicious. The Triple Chocolate is divine!", author: "Maria S.", rating: 5 },
	{ quote: "Open 24/7 is a lifesaver! Their glazed donuts are a classic done perfectly. Friendly staff too.", author: "John D.", rating: 5 },
	{ quote: "Tried the Bavarian cream donut and it was heavenly. So light and not too sweet. Will be back!", author: "Angela P.", rating: 5 },
	{ quote: "Great variety and always fresh. Love stopping by after work.", author: "Carlo M.", rating: 4 }
];

// --- Helper Functions ---
function formatPrice(price) {
	return `₱${price.toFixed(2)}`;
}

function generateStars(rating) {
	let stars = '';
	for (let i = 0; i < 5; i++) {
		stars += (i < rating) ? '⭐' : '☆';
	}
	return stars;
}

// --- Rendering Functions ---


function renderMenuItems(category, containerId) {
	const container = document.getElementById(containerId);
	if (!container || !menuData[category]) return;
	let html = '';
	menuData[category].forEach(item => {
		// Create tags HTML or empty div to maintain spacing
		const tagsHtml = item.tags && item.tags.length > 0
			? item.tags.map(tag => `<span class="menu-item-tag">${tag}</span>`).join(' ')
			: '';

		html += `
            <div class="menu-item-card">
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}" class="menu-item-img">
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <span class="menu-item-price">${formatPrice(item.price)}</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    <div class="menu-item-tags">
                        ${tagsHtml}
                    </div>
                    <div class="menu-item-actions">
                        <button class="menu-item-button">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
	});
	container.innerHTML = html;
}

function renderTestimonials(containerId) {
	const container = document.getElementById(containerId);
	if (!container) return;
	let html = '';
	testimonialData.forEach((testimonial, index) => {
		html += `
            <div class="w3-col l4 m6 w3-margin-bottom animate-on-scroll">
                <div class="testimonial-card w3-card w3-white">
                    <div class="w3-container">
                        <p class="testimonial-quote">"${testimonial.quote}"</p>
                        <p class="testimonial-author"><b>- ${testimonial.author}</b></p>
                        <p class="testimonial-rating">${generateStars(testimonial.rating)}</p>
                    </div>
                </div>
            </div>
        `;
	});
	container.innerHTML = html;
	setupScrollAnimations(); // Re-run animation setup after adding testimonials
}

// --- Navbar Scroll Effect ---
const navbar = document.getElementById("myNavbar");
window.onscroll = function() {
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
		if (navbar) navbar.classList.add("custom-navbar-scrolled");
	} else {
		if (navbar) navbar.classList.remove("custom-navbar-scrolled");
	}
};

// --- Menu Tabs ---
function openMenu(evt, menuName) {
	var i, x, tablinks;
	x = document.getElementsByClassName("menu-content");
	for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablink");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].classList.remove("active");
	}
	const menuElement = document.getElementById(menuName);
	if (menuElement) {
		menuElement.style.display = "block";
	}
	// Ensure evt.currentTarget exists and has the target element
	if (evt && evt.currentTarget && evt.currentTarget.querySelector('.tablink')) {
		evt.currentTarget.querySelector('.tablink').classList.add("active");
	}
}

// --- Game Logic ---
const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');
const gameOverMessage = document.getElementById('gameOverMessage');
const startGameButton = document.getElementById('startGameButton');
const stopGameButton = document.getElementById('stopGameButton');

let score = 0;
let gameInterval = null;
let gameActive = false; // This flag is crucial

function prepareGame() {
	const gameSection = document.getElementById('game');
	if (gameSection) {
		gameSection.style.display = 'block';
		resetGame(); // Reset score/message if they click the nav link while game might be over
		// Ensure buttons are in correct initial state
		if (startGameButton) startGameButton.disabled = false;
		if (stopGameButton) stopGameButton.disabled = true;
	}
}

function resetGame() {
	score = 0;
	updateScore();
	if (gameOverMessage) {
		gameOverMessage.textContent = '';
		gameOverMessage.classList.remove('visible');
	}
	// Clear any donuts only if the game area exists
	if (gameArea) gameArea.innerHTML = '';

	// Reset buttons
	if (startGameButton) {
		startGameButton.textContent = 'Start Game';
		startGameButton.disabled = false;
	}
	if (stopGameButton) {
		stopGameButton.disabled = true; // Should be disabled until game starts
	}
	console.log("Game Reset."); // DEBUG
}

function startGame() {
	// Prevent starting if already active or gameArea doesn't exist
	if (gameActive || !gameArea) return;

	console.log("startGame() called. Setting gameActive = true."); // DEBUG
	gameActive = true; // Set active *before* resetGame clears messages etc.
	resetGame(); // Clear score, message, old donuts, reset button text

	// Set button states for active game
	if (stopGameButton) stopGameButton.disabled = false;
	if (startGameButton) startGameButton.disabled = true;

	// Start interval
	if (gameInterval) clearInterval(gameInterval); // Clear just in case
	gameInterval = setInterval(createDonut, 1200); // Spawn rate
	console.log("Game interval started with ID:", gameInterval); // DEBUG
}

function stopGame() {
	// Only act if the game is currently active
	if (!gameActive) {
		console.log("stopGame() called but game not active."); //DEBUG
		return;
	}
	console.log("stopGame() called. Setting gameActive = false."); // DEBUG
	gameActive = false; // Set inactive
	if (gameInterval) {
		console.log("Clearing interval ID in stopGame:", gameInterval); // DEBUG
		clearInterval(gameInterval);
		gameInterval = null;
	}
	// Reset button states after stopping
	if (startGameButton) {
		startGameButton.textContent = 'Start Game';
		startGameButton.disabled = false;
	}
	if (stopGameButton) stopGameButton.disabled = true;
	console.log("stopGame() finished."); // DEBUG
}

function gameOver() {
	// Check if game is actually active to prevent multiple calls
	if (!gameActive) {
		// console.log("gameOver() called but game already inactive."); // DEBUG - can be noisy
		return;
	}
	console.log("gameOver() function called. Setting gameActive = false."); // DEBUG
	gameActive = false; // Set inactive *immediately*
	if (gameInterval) {
		console.log("Clearing interval ID in gameOver:", gameInterval); // DEBUG
		clearInterval(gameInterval);
		gameInterval = null;
	}
	if (gameOverMessage) {
		gameOverMessage.textContent = `Game Over! Final Score: ${score}`;
		gameOverMessage.classList.add('visible');
		console.log("Game Over message displayed."); // DEBUG
	}
	// Update buttons for game over state
	if (startGameButton) {
		startGameButton.textContent = 'Play Again?';
		startGameButton.disabled = false; // Allow restart
	}
	if (stopGameButton) {
		stopGameButton.disabled = true; // Cannot stop when game is over
	}
	console.log("gameOver() finished."); // DEBUG
}


function createDonut() {
	// Check if game is active *before* creating a donut
	if (!gameActive || !gameArea) {
		return; // Don't create if game isn't running
	}

	const donut = document.createElement('div');
	donut.classList.add('falling-donut');

	// Positioning logic
	const gameAreaWidth = gameArea.offsetWidth;
	const donutSize = 50;
	if (gameAreaWidth > donutSize) {
		donut.style.left = Math.random() * (gameAreaWidth - donutSize) + 'px';
	} else {
		donut.style.left = '0px';
	}

	// Animation and appearance
	const fallDuration = Math.random() * 3 + 3;
	donut.style.animationDuration = fallDuration + 's';
	const colors = ['#FF69B4', '#8B4513', '#ADD8E6', '#FFD700', '#BA55D3'];
	const randomColor = colors[Math.floor(Math.random() * colors.length)];
	donut.style.backgroundImage = `radial-gradient(circle, white 30%, ${randomColor} 70%)`;


	// Click listener
	donut.addEventListener('click', function() {
		if (!gameActive) return;
		score++;
		updateScore();
		requestAnimationFrame(() => { if (donut.parentNode) { donut.remove(); } });
	});

	// Animation End Listener - *** UPDATED DEBUG LOGGING ***
	donut.addEventListener('animationend', function handleAnimationEnd() {
		console.log(`animationend fired. gameActive: ${gameActive}`); // DEBUG

		// When animation ends, if the game is still active, this means the donut wasn't clicked
		// and has reached the bottom - it's a miss!
		if (gameActive) {
			console.log("GAME OVER: Donut reached bottom without being clicked!"); // DEBUG

			// Remove the donut
			if (donut.parentNode) {
				donut.remove();
			}

			// End the game immediately
			gameOver();
		} else {
			// Game already stopped/over, just clean up the donut
			if (donut.parentNode) {
				donut.remove();
			}
		}
	});	// Append the donut only if gameArea exists
	if (gameArea) {
		gameArea.appendChild(donut);
	}
}
function updateScore() {
	if (scoreBoard) scoreBoard.textContent = 'Score: ' + score;
}


// --- Scroll Animations (Intersection Observer) ---
let observer;

function setupScrollAnimations() {
	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	};
	const observerCallback = (entries, observer) => {
		entries.forEach((entry, index) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				if (entry.target.classList.contains('testimonial-card')) {
					entry.target.classList.add('fade-in-up');
					entry.target.style.transitionDelay = `${(index % 3) * 100}ms`;
				} else {
					entry.target.classList.add('fade-in-up');
				}
				observer.unobserve(entry.target);
			}
		});
	};
	if (observer) observer.disconnect(); // Disconnect old one if re-running
	observer = new IntersectionObserver(observerCallback, observerOptions);
	const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
	elementsToAnimate.forEach(el => observer.observe(el));
}


// --- Initial Setup ---
document.addEventListener('DOMContentLoaded', () => {
	// Render dynamic content FIRST
	renderMenuItems('donuts', 'donutMenuContainer');
	renderMenuItems('drinks', 'drinkMenuContainer');
	renderMenuItems('breads', 'breadMenuContainer');
	renderTestimonials('testimonialContainer'); // Calls setupScrollAnimations internally now

	// Set initial menu state AFTER content is rendered
	if (document.getElementById("defaultOpen")) {
		document.getElementById("defaultOpen").click();
	} else {
		const firstMenu = document.querySelector('.menu-content');
		if (firstMenu) firstMenu.style.display = 'block';
	}

	// Set initial game button state
	resetGame(); // Reset score/message
	if (startGameButton) startGameButton.disabled = false; // Ensure start is enabled initially
	if (stopGameButton) stopGameButton.disabled = true;  // Ensure stop is disabled initially

	// Setup scroll animations for any static elements not covered by renderTestimonials
	// setupScrollAnimations(); // Called by renderTestimonials now, might not be needed here unless other static elements exist
});
