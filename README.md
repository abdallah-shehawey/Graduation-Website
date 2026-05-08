# 🎓 EECE Class of 2026 — Graduation Website

> **Electronics & Communication Engineering · Faculty of Engineering · Al-Azhar University**

An interactive graduation celebration website for the Class of 2026 of the Communication and Electronics Engineering department. It features a live event countdown, a digital class yearbook, and a showcase of graduation projects — all wrapped in a modern glassmorphism UI with ambient background music.

---

## ✨ Features

### ⏱ Countdown Mode

- Real-time countdown to three key graduation milestones:
  - **Final Exam** — June 3, 2026 at 10:00 AM
  - **Project Discussion** — July 1, 2026 at 10:00 AM
  - **Graduation Party** — July 22, 2026 at 10:00 AM
- Animated digits for Days, Hours, Minutes, and Seconds
- Celebration message displayed when a countdown reaches zero
- Live local time display

### 📸 Class Yearbook

- Full gallery of **25 students** with profile photos
- Each student card shows:
  - Profile photo (with avatar fallback on error)
  - Name and academic track badge(s)
  - Social links: LinkedIn, GitHub, WhatsApp, Facebook
- **Interactive filtering** by academic track category (Embedded, Digital Design, Network, AI, DevOps, Software Testing)
- **Real-time search** by student name or track
- Animated statistics counters by track category
- Click-to-expand photo modal with full details and social links
- Mobile hardware back-button support to close the modal

### 📁 Graduation Projects

- Browse graduation projects by category:
  - **Digital Design** — 2 project groups
  - **Embedded Systems** — 1 project group
  - **Network** — 2 project groups
- Each project card lists team members, with the **Team Leader** highlighted

### 🎵 Background Music

- Ambient audio player with a curated playlist (`.m4a` tracks)
- Randomized playback order on each visit
- Simple tap-to-play / tap-to-pause button in the header
- Hint animation to encourage interaction

---

## 🗂 Project Structure

```bash
EECE-Azhar/
├── index.html          # Main HTML — structure, navigation, and layout
├── style.css           # Core styles (glassmorphism, animations, grid layouts)
├── mobile_perf.css     # Mobile-specific performance optimizations
├── script.js           # All JavaScript logic (data, countdown, yearbook, projects)
├── sort_students.js    # Utility script for sorting student data
├── bg.jpg              # Full-page background image
├── favicon.ico         # Browser tab icon
├── websiteicon.png     # 64×64 PNG site icon
├── logo-faculty.png    # Faculty of Engineering logo
├── logo-university.png # Al-Azhar University logo
├── Pic/                # Student profile photos (25 images)
├── audio/              # Background music tracks (4 × .m4a)
├── icons/              # Social media and UI SVG/PNG icons
└── font/               # Self-hosted PoetsenOne font (TTF)
```

---

## 🛠 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Structure  | HTML5 (semantic)                    |
| Styling    | Vanilla CSS3 (glassmorphism, CSS variables, Grid, Flexbox) |
| Logic      | Vanilla JavaScript (ES6+)           |
| Fonts      | PoetsenOne (self-hosted) · Outfit & DM Sans (Google Fonts) |
| Icons      | Custom SVG + PNG icons              |
| Audio      | HTML5 `<audio>` API                 |

No build tools, no frameworks, no external runtime dependencies — runs entirely in the browser.

---

## 🚀 Getting Started

Since this is a pure HTML/CSS/JS project, no installation is needed.

### Run Locally

Simply open the project folder and serve it with any static file server. For example, using the VS Code **Live Server** extension, or with Python:

```bash
# Python 3
python3 -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

> ⚠️ Direct `file://` opening may block audio autoplay or image loading in some browsers. A local server is recommended.

---

## 🎨 Design Highlights

- **Glassmorphism** cards with `backdrop-filter: blur()` and translucent backgrounds
- **Floating particle system** rendered via JavaScript for ambient depth
- **Smooth CSS animations**: `fadeInUp`, card hover lifts, glow pulses
- **Dark deep-space theme** (`#0a0a1e` base) with vibrant purple/blue accent gradients
- **Fully responsive** — optimized for both desktop and mobile (768 px breakpoint)
- Mobile performance mode: disables heavy blur effects and reduces particle count

---

## 📱 Mobile Optimizations

- `mobile_perf.css` loaded conditionally via `media="(max-width: 768px)"`
- `backdrop-filter` replaced with solid semi-transparent fallbacks on mobile
- Particle count and complexity reduced
- GPU hardware acceleration via `transform: translateZ(0)` on scroll containers
- Hardware back-button closes the photo modal without exiting the app

---

## 👨‍💻 Developer

**Abdallah Shehawey**  
Electronics & Communication Engineering — Class of 2026, Al-Azhar University

[![GitHub](https://img.shields.io/badge/GitHub-abdallah--shehawey-181717?logo=github)](https://github.com/abdallah-shehawey/Graduation-Website)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Abdallah%20Shehawey-0A66C2?logo=linkedin)](https://www.linkedin.com/in/abdallah-shehawey)

---

## 📄 License

This project is open source. Feel free to fork and adapt it for your own graduation class!
