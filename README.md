
# 🍩 Jonuts - Delicious Donuts!

Welcome to **Jonuts**, the ultimate interactive donut shop website! This project features a visually rich, fully interactive front-end that showcases our mouthwatering menu, a fun donut-catching game, animated testimonials, and a floating cart experience — all designed using **HTML**, **CSS**, and **JavaScript**.

---

## 🌟 Features

### 🔝 Navigation
- Responsive top navigation with mobile toggle support
- Smooth scrolling to sections
- Fixed floating cart button with live item count

### 🎥 Hero Section
- Fullscreen looping background video
- Eye-catching overlay and CTA buttons

### 🧁 Menu Section
- Tabbed interface (Donuts, Drinks, Breads, Specialties)
- Menu items dynamically injected via JavaScript

### 🧑‍🍳 About Section
- Team introduction
- Animated scroll-in content

### 💬 Testimonials
- Carousel with navigation buttons and indicators
- Content loaded dynamically via JavaScript

### 🎮 Game Section
- **Catch the Donuts**: click-to-score falling donut game
- Start/Stop controls
- Live score and game over message

### 📞 Contact Section
- Location and contact info
- Reservation/contact form with date & time input

### 🛒 Cart System
- Floating cart button
- Side panel cart view with items, total, and checkout button
- Checkout modal with tracking number and total

---

## 🗂️ File Structure

```
jonuts/
├── images/                 # Donut logo and other images
├── videos/                 # Hero background video
├── js/                     # Handles menu, cart, game, and animations
├── style.css               # Custom styles (if applicable)
├── index.html              # Main website file (this project)
└── single-file.html        # Contains all of the logic but in a single file for those who cannot load js due to cors error
```

---

## 🚀 Getting Started

### 1. Clone or Download the Repo

```bash
git clone https://github.com/your-username/jonuts.git
cd jonuts
```

### 2. Open in Browser
- If you have `http-server` or `live-server` installed, run it inside the directory
- else simply open `single-file.html` in your preferred browser.

---

## 🔧 Customization

- **Menu Items**: Populate the `donutMenuContainer`, `drinkMenuContainer`, etc., dynamically via `script.js`
- **Testimonials**: Update testimonials array or fetch from an external source
- **Game Mechanics**: Customize donut drop speed, scoring logic, and visuals
- **Form Handling**: Add form submission logic in `script.js` to connect to your backend or email service

---

## 🎨 Fonts & Icons

- [Amatic SC](https://fonts.google.com/specimen/Amatic+SC)
- [Lato](https://fonts.google.com/specimen/Lato)
- [Font Awesome 6.5](https://fontawesome.com/)
- [W3.CSS](https://www.w3schools.com/w3css/) (UI Framework)

---

## 📦 Dependencies

All dependencies are included via CDN:
- W3.CSS
- Font Awesome
- Google Fonts

---

## 📬 Other details

Design by the Jonuts Team and Reimplemented by yours truly.
Feel free to customize, improve, and share!

---

## 📄 License

This project is open-source and free to use under the [MIT License](LICENSE).
