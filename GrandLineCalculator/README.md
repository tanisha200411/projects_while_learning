# ☠ Grand Line Adventure — One Piece Navigation & Suite

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Framework-Flask-black.svg)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)

An interactive, cinematic **One Piece-inspired Grand Line adventure web application** built with HTML5, CSS3, modular Vanilla JavaScript, and a Python Flask backend backed by SQLite.

---

## 🌟 Key Features

- **🧭 Grand Line Voyage & Direction Calculator**: Calculates distance in Nautical Miles, travel days, meat/water/cola rations, and degree bearings (\(0^\circ - 360^\circ\)) with cardinal steering vectors.
- **🧭 Live 3D Log Pose Compass**: Interactive HTML5 Canvas Log Pose pointer with magnetic wobble physics, target locking sound effects, and ship steering wheel controls.
- **🗺️ Interactive Route Canvas Map**: Visualizes Paradise, New World, Red Line barriers, and Calm Belts with trajectory plotting, distance markers, and island modals.
- **🏴‍☠️ Character Roster & Filters**: Filter characters by Straw Hats, Yonko, Marines, Warlords, or Pirates with combat stats.
- **💰 Wanted Poster Generator & 3D Flip Cards**: Wanted posters with smooth 3D flip card animations, crew bounty calculator, and custom poster designer.
- **🍈 Devil Fruit Encyclopedia**: Catalog of Paramecia, Zoan, Mythical Zoan, and Logia fruits with Berry ฿ to USD/EUR currency converter.

---

## 📁 Repository Structure

```text
GrandLineAdventure/
├── app.py                  # Flask Web Server & SQLite REST API
├── requirements.txt        # Python dependencies
├── README.md               # Documentation
├── .gitignore              # Git ignore rules
│
├── pages/                  # Web Application Pages
│   ├── index.html          # Home & Voyage Calculator
│   ├── about.html          # Lore, Tech & Project Info
│   ├── characters.html     # Character Roster & Stats
│   ├── islands.html        # Island Atlas & Climate Matrix
│   ├── bounty.html         # Wanted Posters & Bounty Calc
│   └── devil-fruits.html   # Devil Fruit Encyclopedia
│
├── css/                    # Modular Stylesheets
│   ├── variables.css       # Theme tokens & variables
│   ├── style.css           # Global typography & layout
│   ├── navbar.css          # Navigation & drawer
│   ├── hero.css            # Cinematic hero banner
│   ├── cards.css           # 3D tilt card animations
│   ├── loader.css          # Pirate skull preloader
│   ├── map.css             # Map canvas & modals
│   ├── bounty.css          # Wanted poster 3D flip styles
│   ├── animations.css     # CSS keyframes & effects
│   ├── responsive.css      # Tablet & mobile media queries
│   └── calculator.css      # Voyage calculator styles
│
├── js/                     # Modular JavaScript
│   ├── main.js             # Main bootstrapper
│   ├── navbar.js           # Navbar scroll & toggle
│   ├── loader.js           # Loading screen handler
│   ├── hero.js             # Parallax hero banner
│   ├── cards.js            # 3D card tilt effect
│   ├── particles.js        # Canvas ocean particles
│   ├── map.js              # Interactive map canvas
│   ├── bounty.js           # Bounty calculation & 3D flip
│   ├── calculator.js       # Nautical distance & bearing formula
│   ├── compass.js          # 3D Log Pose canvas engine
│   └── audio.js            # Web Audio sound synth
│
└── assets/                 # Images & static media
```

---

## 🚀 Quick Start (Local Setup)

### Option 1: Python Flask Server
```bash
# 1. Clone the repository
git clone https://github.com/Tanisha200411/GrandLineCalculator.git
cd GrandLineCalculator

# 2. Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# 3. Install requirements
pip install -r requirements.txt

# 4. Run the Flask Server
python app.py
```
Open **`http://localhost:5000`** in your browser.

---

### Option 2: Static Server
```bash
python -m http.server 8080
```
Open **`http://localhost:8080/pages/index.html`** in your browser.

---

## 📜 Credits & License

Made with ❤️ by **Tanisha200411**. Inspired by Eiichiro Oda's *One Piece*.  
Distributed under the MIT License.
