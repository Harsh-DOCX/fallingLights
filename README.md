# Falling Lights

A simple browser game where you control a bucket to catch falling stars. Try to catch as many stars as you can before the time runs out!

---

## How to Play

- **Drag** the bucket left or right using your mouse or touch to catch the falling stars.
- Each star caught increases your score by 1.
- The game lasts for 60 seconds.
- Try to beat your high score! High scores are saved in your browser's local storage.

---

## Features

- Responsive drag-and-drop bucket control (mouse and touch supported).
- Falling stars that appear randomly and move downward.
- Score and high score tracking with local storage persistence.
- Countdown timer with game over alert.
- Restart button appears when the game ends.

---

## File Structure

- `index.html` — Main HTML file for the game layout.
- `style.css` — Stylesheet for game appearance and layout.
- `script.js` — JavaScript code handling game logic and interactions.

---

## How to Run

1. Download all the files (`index.html`, `style.css`, and `script.js`) into the same folder.
2. Open `index.html` in a modern web browser (Chrome, Firefox, Edge, Safari).
3. The game will start automatically. Use your mouse or finger to drag the bucket and catch stars.

---

## Customization

- Adjust star falling speed by changing the value in `updateStars()` (currently `top += 4;`).
- Change game duration by modifying the `time` variable in `script.js`.
- Customize bucket or star styles via `style.css`.

---

## License

This project is open-source and free to use for personal or educational purposes.

---

Enjoy catching the stars!

