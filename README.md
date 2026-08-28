# 🐾 Pink Cat Rooftop Jump

A vibrant, fast-paced infinite runner game built with pure **HTML5 Canvas**, **CSS3**, **JavaScript (ES6)**, and the **Web Audio API**.

![Pink Cat Jump Preview](https://img.shields.io/badge/Game-HTML5%20Canvas-ff69b4?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)

---

## 🌟 Game Highlights

- 🐱 **Cute Animated Protagonist**: Play as Pinky, a cute pink cat with procedural running leg animation, waving tail, twitching ears, and jump tuck pose.
- 🏢 **Variety Color Rooftops**: Jump across dynamically generated buildings in vibrant pastel and neon palettes (Magenta Pink, Electric Cyan, Neon Purple, Golden Yellow, Mint Green, Coral Red, and Deep Indigo).
- ✨ **Double Jump & Physics**: Perform precision single and double jumps to leap over variable height buildings and gaps.
- 🐟 **Collectibles & Power-ups**:
  - 🐟 **Golden Fish**: +100 Points & increases fish count.
  - ⭐ **Catnip Boost**: +500 Points, grants magnetic item pull, and gives a temporary speed boost aura.
- 🎵 **Synthesized Sound Effects**: Built-in audio synthesizer using Web Audio API for jump chimes, fish pickups, powerup sweeps, and game over sounds—requiring zero external `.mp3` files!
- 🌌 **Parallax Sky & Atmosphere**: Dynamic night sky with glowing moon, twinkling stars, and parallax skyscraper silhouettes.
- 🏆 **High Score Persistence**: Scores are automatically tracked and saved in browser `localStorage`.

---

## 🎮 Game Controls

| Action | Keyboard | Touch / Mouse |
| :--- | :--- | :--- |
| **Jump / Double Jump** | <kbd>Space</kbd> / <kbd>▲ Up Arrow</kbd> / <kbd>W</kbd> | Click / Tap Screen |
| **Pause / Resume** | <kbd>X</kbd> / <kbd>P</kbd> / <kbd>Esc</kbd> | Pause Button ⏸️ |

---

## 🚀 How to Run Locally

No build tools or npm installs required! Simply serve the directory with any HTTP server:

```bash
# Clone the repository
git clone https://github.com/sirinyaraksapong-eng/pink-cat-jump.git
cd pink-cat-jump

# Run a simple Python web server
python3 -m http.server 8080
```

Then open your browser and navigate to **`http://localhost:8080`**.

---

## 🛠️ Project Structure

```
pink-cat-jump/
├── index.html   # Main HTML layout & UI modals (Start, HUD, Pause, Game Over)
├── style.css    # Responsive candy-themed glassmorphism styling
├── game.js     # Core game loop, rendering engine, physics, & audio synth
├── README.md    # Documentation
└── .gitignore   # Git ignore rules
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
