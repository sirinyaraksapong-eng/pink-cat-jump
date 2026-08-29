/**
 * Pink Cat Rooftop Jump
 * ---------------------
 * High-performance HTML5 Canvas Infinite Runner
 */

// Sound Manager using Web Audio API (Zero external assets required!)
class SoundManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.bgmTimer = null;
        this.bgmStep = 0;
        this.initOnInteraction();
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    initOnInteraction() {
        const unlock = () => {
            this.init();
            window.removeEventListener('keydown', unlock);
            window.removeEventListener('touchstart', unlock);
            window.removeEventListener('click', unlock);
        };
        window.addEventListener('keydown', unlock);
        window.addEventListener('touchstart', unlock);
        window.addEventListener('click', unlock);
    }

    startBGM() {
        if (this.bgmTimer || !this.enabled) return;
        this.init();

        // Cute bouncy melody notes (C Major / A Minor Pentatonic)
        const melody = [
            523.25, 659.25, 783.99, 659.25,  880.00, 783.99, 659.25, 587.33,
            523.25, 587.33, 659.25, 783.99, 1046.50, 880.00, 783.99, 659.25,
            659.25, 783.99, 880.00, 1046.50, 880.00, 783.99, 659.25, 587.33,
            523.25, 659.25, 587.33, 523.25,  587.33, 659.25, 523.25, 0
        ];
        
        const bassline = [
            130.81, 0, 130.81, 0,  174.61, 0, 174.61, 0,
            220.00, 0, 220.00, 0,  196.00, 0, 196.00, 0,
            130.81, 0, 130.81, 0,  174.61, 0, 174.61, 0,
            220.00, 0, 196.00, 0,  130.81, 0, 130.81, 0
        ];

        this.bgmStep = 0;
        this.bgmTimer = setInterval(() => {
            if (!this.enabled || !this.ctx) return;
            if (this.ctx.state === 'suspended') this.ctx.resume();

            const now = this.ctx.currentTime;

            // Play Melody Note (Cute soft triangle tone)
            const noteFreq = melody[this.bgmStep % melody.length];
            if (noteFreq > 0) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(noteFreq, now);
                gain.gain.setValueAtTime(0.06, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.16);
            }

            // Play Bass Note (Soft rounded pulse)
            const bassFreq = bassline[this.bgmStep % bassline.length];
            if (bassFreq > 0) {
                const bOsc = this.ctx.createOscillator();
                const bGain = this.ctx.createGain();
                bOsc.type = 'sine';
                bOsc.frequency.setValueAtTime(bassFreq, now);
                bGain.gain.setValueAtTime(0.07, now);
                bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.20);
                bOsc.connect(bGain);
                bGain.connect(this.ctx.destination);
                bOsc.start(now);
                bOsc.stop(now + 0.20);
            }

            this.bgmStep++;
        }, 180);
    }

    stopBGM() {
        if (this.bgmTimer) {
            clearInterval(this.bgmTimer);
            this.bgmTimer = null;
        }
    }

    playJump() {
        if (!this.enabled || !this.ctx) return;
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(650, this.ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
    }

    playDoubleJump() {
        if (!this.enabled || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(500, now);
        osc.frequency.setValueAtTime(750, now + 0.08);
        osc.frequency.setValueAtTime(1000, now + 0.16);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.25);
    }

    playFishCollect() {
        if (!this.enabled || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.12);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.15);
    }

    playCatnipPower() {
        if (!this.enabled || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, index) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + index * 0.06);
            gain.gain.setValueAtTime(0.2, now + index * 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.06 + 0.2);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + index * 0.06);
            osc.stop(now + index * 0.06 + 0.2);
        });
    }

    playGameOver() {
        if (!this.enabled || !this.ctx) return;
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(120, now + 0.4);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(now + 0.4);
    }
}

const sounds = new SoundManager();

// Color Palettes for Buildings & Atmosphere
const BUILDING_PALETTES = [
    { main: '#FF4081', top: '#FF80AB', window: '#FFE5EC', shadow: '#C2185B' }, // Vibrant Pink
    { main: '#00E5FF', top: '#80D8FF', window: '#E0F7FA', shadow: '#0097A7' }, // Electric Cyan
    { main: '#9C27B0', top: '#E040FB', window: '#F3E5F5', shadow: '#6A1B9A' }, // Neon Purple
    { main: '#FFC107', top: '#FFE082', window: '#FFF8E1', shadow: '#FFA000' }, // Golden Yellow
    { main: '#00E676', top: '#B9F6CA', window: '#E8F5E9', shadow: '#00A152' }, // Mint Green
    { main: '#FF5722', top: '#FF9E80', window: '#FBE9E7', shadow: '#D84315' }, // Coral Red
    { main: '#3F51B5', top: '#8C9EFF', window: '#E8EAF6', shadow: '#1A237E' }  // Deep Indigo
];

// Main Game Class
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Dimensions
        this.width = 960;
        this.height = 540;

        // Game State
        this.state = 'START'; // 'START', 'PLAYING', 'PAUSED', 'GAMEOVER'
        this.score = 0;
        this.fishCount = 0;
        this.highScore = parseInt(localStorage.getItem('pink_cat_highscore') || '0', 10);
        this.gameSpeed = 6;
        this.baseSpeed = 6;
        this.maxSpeed = 14;
        this.distance = 0;

        // Power-up State
        this.catnipActive = false;
        this.catnipTimer = 0;

        // Game Objects
        this.cat = null;
        this.buildings = [];
        this.collectibles = [];
        this.particles = [];
        this.bgStars = [];

        // UI Elements
        this.scoreValEl = document.getElementById('scoreVal');
        this.fishValEl = document.getElementById('fishVal');
        this.powerupIndEl = document.getElementById('powerupIndicator');
        this.startScreen = document.getElementById('startScreen');
        this.pauseScreen = document.getElementById('pauseScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.hud = document.getElementById('hud');

        this.initStars();
        this.bindEvents();
        this.updateHighScoreDisplay();
    }

    initStars() {
        this.bgStars = [];
        for (let i = 0; i < 60; i++) {
            this.bgStars.push({
                x: Math.random() * this.width,
                y: Math.random() * (this.height * 0.65),
                size: Math.random() * 2.5 + 1,
                alpha: Math.random() * 0.8 + 0.2,
                speed: Math.random() * 0.3 + 0.1
            });
        }
    }

    updateHighScoreDisplay() {
        document.getElementById('startHighScore').textContent = this.highScore;
        document.getElementById('finalHighScore').textContent = this.highScore;
    }

    bindEvents() {
        // Keyboard controls
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Enter' || e.code === 'KeyR') {
                if (this.state === 'PLAYING') {
                    if (e.code !== 'Enter' && e.code !== 'KeyR') {
                        e.preventDefault();
                        this.cat.jump();
                    }
                } else if (this.state === 'START') {
                    e.preventDefault();
                    this.startGame();
                } else if (this.state === 'GAMEOVER') {
                    e.preventDefault();
                    this.restartGame();
                }
            } else if (e.code === 'KeyP' || e.code === 'Escape' || e.code === 'KeyX') {
                if (this.state === 'PLAYING') {
                    this.pauseGame();
                } else if (this.state === 'PAUSED') {
                    this.resumeGame();
                }
            }
        });

        // Pointer/Touch controls on Canvas
        this.canvas.addEventListener('pointerdown', (e) => {
            e.preventDefault();
            if (this.state === 'PLAYING') {
                this.cat.jump();
            }
        });

        // Allow clicking/tapping anywhere on Game Over Screen or Start Screen to begin/replay
        this.gameOverScreen.addEventListener('click', (e) => {
            if (this.state === 'GAMEOVER') {
                this.restartGame();
            }
        });

        this.startScreen.addEventListener('click', (e) => {
            // Prevent triggering if sound toggle button was clicked
            if (e.target.id === 'soundToggleBtn') return;
            if (this.state === 'START') {
                this.startGame();
            }
        });

        // UI Button Handlers
        document.getElementById('startBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.startGame();
        });
        document.getElementById('pauseBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.pauseGame();
        });
        document.getElementById('resumeBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.resumeGame();
        });
        document.getElementById('restartPauseBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.restartGame();
        });
        document.getElementById('restartBtn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.restartGame();
        });

        const soundBtn = document.getElementById('soundToggleBtn');
        soundBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sounds.enabled = !sounds.enabled;
            if (!sounds.enabled) {
                sounds.stopBGM();
            } else if (this.state === 'PLAYING') {
                sounds.startBGM();
            }
            soundBtn.textContent = sounds.enabled ? '🔊 Sound: ON' : '🔇 Sound: OFF';
        });
    }

    startGame() {
        this.state = 'PLAYING';
        this.score = 0;
        this.fishCount = 0;
        this.gameSpeed = this.baseSpeed;
        this.distance = 0;
        this.catnipActive = false;
        this.catnipTimer = 0;
        this.giantUnlocked = false;
        this.particles = [];
        this.collectibles = [];
        if (this.powerupIndEl) {
            this.powerupIndEl.classList.remove('active');
        }

        // UI switch - cleanly hide all modal overlays
        this.startScreen.classList.remove('active');
        this.startScreen.classList.add('hidden');
        this.pauseScreen.classList.remove('active');
        this.pauseScreen.classList.add('hidden');
        this.gameOverScreen.classList.remove('active');
        this.gameOverScreen.classList.add('hidden');
        this.hud.classList.remove('hidden');

        // Init Cat
        this.cat = new Cat(120, 200, this);

        // Generate initial starting building layout
        this.buildings = [];
        let currentX = 0;
        // First safe starting platform
        let firstBuilding = new Building(0, 320, 450, BUILDING_PALETTES[0]);
        this.buildings.push(firstBuilding);
        currentX = 450;

        // Fill screen with initial buildings
        while (currentX < this.width + 500) {
            currentX = this.spawnBuilding(currentX);
        }

        // Snap cat onto first building
        this.cat.y = firstBuilding.y - this.cat.height;
        this.cat.groundY = firstBuilding.y;
        this.cat.isGrounded = true;

        sounds.init();
        sounds.startBGM();
    }

    spawnBuilding(startX) {
        const minGap = 80 + (this.gameSpeed * 5);
        const maxGap = 160 + (this.gameSpeed * 8);
        const gap = Math.floor(Math.random() * (maxGap - minGap)) + minGap;

        const x = startX + gap;
        const width = Math.floor(Math.random() * 200) + 180; // 180px - 380px wide

        // Height variation
        const minH = 220;
        const maxH = 380;
        const y = Math.floor(Math.random() * (maxH - minH)) + minH;

        const palette = BUILDING_PALETTES[Math.floor(Math.random() * BUILDING_PALETTES.length)];
        const b = new Building(x, y, width, palette);
        this.buildings.push(b);

        // Spawn collectibles on building
        this.spawnCollectiblesOnBuilding(b);

        return x + width;
    }

    spawnCollectiblesOnBuilding(b) {
        const count = Math.floor(Math.random() * 3) + 1;
        const spacing = b.width / (count + 1);

        for (let i = 1; i <= count; i++) {
            const cx = b.x + (spacing * i);
            const cy = b.y - 45 - (Math.random() * 40);

            // 10% chance for Catnip boost star
            const isCatnip = Math.random() < 0.10;
            this.collectibles.push(new Collectible(cx, cy, isCatnip ? 'CATNIP' : 'FISH'));
        }
    }

    pauseGame() {
        if (this.state !== 'PLAYING') return;
        this.state = 'PAUSED';
        sounds.stopBGM();
        this.pauseScreen.classList.remove('hidden');
        this.pauseScreen.classList.add('active');
    }

    resumeGame() {
        if (this.state !== 'PAUSED') return;
        this.state = 'PLAYING';
        sounds.startBGM();
        this.pauseScreen.classList.remove('active');
        this.pauseScreen.classList.add('hidden');
    }

    triggerGameOver() {
        this.state = 'GAMEOVER';
        sounds.stopBGM();
        sounds.playGameOver();

        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('pink_cat_highscore', this.highScore.toString());
            this.updateHighScoreDisplay();
        }

        document.getElementById('finalScore').textContent = Math.floor(this.score);
        document.getElementById('finalFish').textContent = `${this.fishCount} 🐟`;

        this.hud.classList.add('hidden');
        this.gameOverScreen.classList.remove('hidden');
        this.gameOverScreen.classList.add('active');
    }

    restartGame() {
        this.startGame();
    }

    update() {
        if (this.state !== 'PLAYING') return;

        // Speed ramp up over distance
        this.distance += 1;
        this.gameSpeed = Math.min(this.maxSpeed, this.baseSpeed + (this.distance / 1200));

        // Catnip boost logic
        if (this.catnipActive) {
            this.catnipTimer--;
            if (this.catnipTimer <= 0) {
                this.catnipActive = false;
                this.powerupIndEl.classList.remove('active');
            }
        }

        const effectiveSpeed = this.catnipActive ? this.gameSpeed * 1.35 : this.gameSpeed;

        // Update Cat
        this.cat.update(this.buildings, effectiveSpeed, this.score);

        // Giant Cat Mode Unlock at 20000 Score
        if (this.score >= 20000 && !this.giantUnlocked) {
            this.giantUnlocked = true;
            sounds.playCatnipPower();
            this.spawnRainbowBurst(this.cat.x + 22, this.cat.y + 18, true);
        }

        // Check if cat fell below canvas
        if (this.cat.y > this.height + 50) {
            this.triggerGameOver();
            return;
        }

        // Scroll buildings
        for (let i = this.buildings.length - 1; i >= 0; i--) {
            const b = this.buildings[i];
            b.x -= effectiveSpeed;

            // Remove off-screen building
            if (b.x + b.width < -100) {
                this.buildings.splice(i, 1);
            }
        }

        // Maintain continuous building pipeline
        const lastBuilding = this.buildings[this.buildings.length - 1];
        if (lastBuilding && lastBuilding.x + lastBuilding.width < this.width + 400) {
            this.spawnBuilding(lastBuilding.x + lastBuilding.width);
        }

        // Update Collectibles & Magnet Effect
        for (let i = this.collectibles.length - 1; i >= 0; i--) {
            const item = this.collectibles[i];
            item.x -= effectiveSpeed;
            item.update();

            // Catnip Magnet pull
            if (this.catnipActive) {
                const dx = (this.cat.x + this.cat.width / 2) - item.x;
                const dy = (this.cat.y + this.cat.height / 2) - item.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 220) {
                    item.x += (dx / dist) * 10;
                    item.y += (dy / dist) * 10;
                }
            }

            // Collision check with Cat
            if (this.cat.collidesWith(item)) {
                if (item.type === 'FISH') {
                    this.score += 100;
                    this.fishCount += 1;
                    sounds.playFishCollect();
                    this.spawnBurstParticles(item.x, item.y, '#FFD700', 8);
                } else if (item.type === 'CATNIP') {
                    this.score += 500;
                    this.catnipActive = true;
                    this.catnipTimer = 360; // 6 seconds at 60fps
                    this.powerupIndEl.classList.add('active');
                    sounds.playCatnipPower();
                    this.spawnBurstParticles(item.x, item.y, '#E040FB', 15);
                }
                this.collectibles.splice(i, 1);
                continue;
            }

            // Remove off-screen item
            if (item.x < -50) {
                this.collectibles.splice(i, 1);
            }
        }

        // Add passive score for running
        this.score += 0.2 * (effectiveSpeed / this.baseSpeed);
        this.scoreValEl.textContent = Math.floor(this.score);
        this.fishValEl.textContent = this.fishCount;

        // Rainbow trail particles behind cat while airborne/jumping
        if (!this.cat.isGrounded) {
            const rainbowColors = ['#FF2D55', '#FF9500', '#FFCC00', '#4CD964', '#5AC8FA', '#5856D6', '#AF52DE'];
            const color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
            this.particles.push(new Particle(
                this.cat.x + Math.random() * 20,
                this.cat.y + Math.random() * 20 + 8,
                -effectiveSpeed * 0.4 + (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 2,
                color,
                Math.random() * 5 + 3,
                25
            ));
        }

        // Particle trail from cat running
        if (this.cat.isGrounded && Math.random() < 0.4) {
            this.particles.push(new Particle(
                this.cat.x + 5,
                this.cat.y + this.cat.height - 2,
                (Math.random() - 0.5) * 2 - effectiveSpeed * 0.3,
                (Math.random() - 0.5) * 1.5,
                'rgba(255, 182, 193, 0.6)',
                Math.random() * 4 + 2,
                20
            ));
        }

        // Update Particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }

        // Update Star background
        this.bgStars.forEach(s => {
            s.x -= s.speed * (effectiveSpeed / 6);
            if (s.x < 0) s.x = this.width;
        });
    }

    spawnRainbowBurst(x, y, isDoubleJump = false) {
        const count = isDoubleJump ? 24 : 14;
        const rainbowColors = ['#FF2D55', '#FF9500', '#FFCC00', '#4CD964', '#5AC8FA', '#5856D6', '#AF52DE'];
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = isDoubleJump ? Math.random() * 6 + 4 : Math.random() * 4 + 3;
            const color = rainbowColors[i % rainbowColors.length];
            this.particles.push(new Particle(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                color,
                Math.random() * 5 + 3,
                30
            ));
        }
    }

    spawnBurstParticles(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            this.particles.push(new Particle(
                x, y,
                Math.cos(angle) * speed,
                Math.sin(angle) * speed,
                color,
                Math.random() * 5 + 3,
                30
            ));
        }
    }

    draw() {
        // Clear screen with sky gradient
        const skyGrad = this.ctx.createLinearGradient(0, 0, 0, this.height);
        skyGrad.addColorStop(0, '#0f051d');
        skyGrad.addColorStop(0.5, '#291147');
        skyGrad.addColorStop(1, '#4a154b');
        this.ctx.fillStyle = skyGrad;
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Draw Moon / Sun accent
        const moonGrad = this.ctx.createRadialGradient(800, 100, 10, 800, 100, 80);
        moonGrad.addColorStop(0, 'rgba(255, 230, 240, 0.9)');
        moonGrad.addColorStop(0.5, 'rgba(255, 150, 200, 0.3)');
        moonGrad.addColorStop(1, 'rgba(255, 150, 200, 0)');
        this.ctx.fillStyle = moonGrad;
        this.ctx.beginPath();
        this.ctx.arc(800, 100, 80, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw Background Stars
        this.ctx.fillStyle = '#ffffff';
        this.bgStars.forEach(s => {
            this.ctx.globalAlpha = s.alpha * (0.7 + 0.3 * Math.sin(Date.now() * 0.003 + s.x));
            this.ctx.fillRect(s.x, s.y, s.size, s.size);
        });
        this.ctx.globalAlpha = 1.0;

        // Draw Distant City Silhouettes (Parallax)
        this.drawParallaxCity();

        // Draw Buildings
        this.buildings.forEach(b => b.draw(this.ctx));

        // Draw Collectibles
        this.collectibles.forEach(c => c.draw(this.ctx));

        // Draw Particles
        this.particles.forEach(p => p.draw(this.ctx));

        // Draw Cat
        if (this.cat) {
            const isGiant = this.score >= 20000;
            this.cat.draw(this.ctx, this.catnipActive, isGiant);
        }

        // Golden Giant Cat Mode Banner
        if (this.score >= 20000) {
            this.ctx.save();
            this.ctx.fillStyle = '#FFD700';
            this.ctx.shadowColor = '#FF80AB';
            this.ctx.shadowBlur = 14;
            this.ctx.font = '700 22px Fredoka, cursive, sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('👑 GIANT CAT MODE 👑', this.width / 2, 42);
            this.ctx.restore();
        }
    }

    drawParallaxCity() {
        this.ctx.fillStyle = 'rgba(20, 10, 35, 0.6)';
        const offset = (this.distance * 0.4) % 200;
        for (let i = -1; i < 7; i++) {
            const bx = i * 160 - offset;
            const bh = 140 + (i % 3) * 40;
            this.ctx.fillRect(bx, this.height - bh - 80, 130, bh + 80);
        }
    }

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}

// Cat Character Class
class Cat {
    constructor(x, y, game = null) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.width = 44;
        this.height = 36;
        this.vy = 0;
        this.gravity = 0.65;
        this.jumpForce = -13.5;
        this.isGrounded = false;
        this.jumpCount = 0;
        this.maxJumps = Infinity; // Infinite Jump Mode!
        this.animFrame = 0;
        this.groundY = 0;
    }

    jump() {
        this.vy = this.jumpForce;
        this.isGrounded = false;
        this.jumpCount++;
        if (this.game) {
            this.game.spawnRainbowBurst(this.x + 22, this.y + 18, this.jumpCount > 1);
        }
        if (this.jumpCount === 1) {
            sounds.playJump();
        } else {
            sounds.playDoubleJump();
        }
    }

    update(buildings, speed, score = 0) {
        const isGiant = score >= 20000;
        const scale = isGiant ? 1.65 : 1.0;
        this.width = 44 * scale;
        this.height = 36 * scale;

        // Apply Gravity
        this.vy += this.gravity;
        this.y += this.vy;
        this.animFrame += speed * 0.15;

        this.isGrounded = false;

        // Collision check with building rooftops
        for (let b of buildings) {
            const catBottom = this.y + this.height;
            const catRight = this.x + this.width;
            const catLeft = this.x;

            // Check horizontal overlap
            if (catRight > b.x + 10 && catLeft < b.x + b.width - 10) {
                // Check landing on roof top edge
                if (catBottom >= b.y && catBottom <= b.y + Math.max(22, this.vy + 4) && this.vy >= 0) {
                    this.y = b.y - this.height;
                    this.vy = 0;
                    this.isGrounded = true;
                    this.jumpCount = 0;
                    this.groundY = b.y;
                    break;
                }
            }
        }
    }

    collidesWith(item) {
        return (
            this.x < item.x + item.size &&
            this.x + this.width > item.x - item.size &&
            this.y < item.y + item.size &&
            this.y + this.height > item.y - item.size
        );
    }

    draw(ctx, isCatnipActive, isGiant = false) {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (isGiant) {
            ctx.translate(22, 18);
            ctx.scale(1.65, 1.65);
            ctx.translate(-22, -18);
            ctx.shadowColor = '#FFD700';
            ctx.shadowBlur = 22;
        }

        // Vibrant 7-Color Rainbow Ring / Halo around Cat when Jumping
        if (!this.isGrounded) {
            const rainbowColors = ['#FF2D55', '#FF9500', '#FFCC00', '#4CD964', '#5AC8FA', '#5856D6', '#AF52DE'];
            const baseRadius = 26;
            ctx.save();
            ctx.lineWidth = 2.5;
            ctx.globalAlpha = 0.85;
            rainbowColors.forEach((color, i) => {
                ctx.strokeStyle = color;
                ctx.shadowColor = color;
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.arc(22, 18, baseRadius + (i * 2.2), 0, Math.PI * 2);
                ctx.stroke();
            });
            ctx.restore();
        }

        // Catnip Aura effect
        if (isCatnipActive) {
            ctx.shadowColor = '#E040FB';
            ctx.shadowBlur = 18;
        }

        const runCycle = Math.sin(this.animFrame);

        // Slender Thin Cat Body (Sleek Pink Silhouette)
        ctx.fillStyle = '#FF80AB';
        ctx.beginPath();
        ctx.ellipse(20, 22, 15, 9, -0.1, 0, Math.PI * 2);
        ctx.fill();

        // Soft Belly Accent
        ctx.fillStyle = '#FFE5EC';
        ctx.beginPath();
        ctx.ellipse(21, 23, 9, 5, -0.1, 0, Math.PI * 2);
        ctx.fill();

        // Slender Cat Head
        ctx.fillStyle = '#FF80AB';
        ctx.beginPath();
        ctx.arc(31, 13, 10, 0, Math.PI * 2);
        ctx.fill();

        // Pointy Pink Ears
        // Left Ear
        ctx.fillStyle = '#FF4081';
        ctx.beginPath();
        ctx.moveTo(23, 6); ctx.lineTo(27, -4); ctx.lineTo(31, 4); ctx.fill();
        // Right Ear
        ctx.beginPath();
        ctx.moveTo(32, 4); ctx.lineTo(37, -5); ctx.lineTo(41, 6); ctx.fill();

        // Inner Ears
        ctx.fillStyle = '#FFE5EC';
        ctx.beginPath();
        ctx.moveTo(25, 5); ctx.lineTo(27, 0); ctx.lineTo(29, 4); ctx.fill();

        // 🎩 STYLISH CUTE HAT (Purple Top Hat with Golden Star Band)
        // Hat Base/Brim
        ctx.fillStyle = '#7B1FA2';
        ctx.beginPath();
        ctx.ellipse(32, 3, 11, 3.5, -0.15, 0, Math.PI * 2);
        ctx.fill();

        // Hat Crown / Cone
        ctx.fillStyle = '#9C27B0';
        ctx.beginPath();
        ctx.moveTo(25, 2);
        ctx.lineTo(27, -13);
        ctx.lineTo(36, -15);
        ctx.lineTo(38, 1);
        ctx.closePath();
        ctx.fill();

        // Hat Golden Ribbon Band
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(25, 0, 13, 2.5);

        // Tiny Gold Star Badge on Hat
        ctx.fillStyle = '#FFF59D';
        ctx.beginPath();
        ctx.arc(31, 1, 1.8, 0, Math.PI * 2);
        ctx.fill();

        // Cute Eyes (Big Sparkle Slender Eyes)
        ctx.fillStyle = '#1A001F';
        ctx.beginPath();
        ctx.arc(35, 11, 2.2, 0, Math.PI * 2);
        ctx.fill();
        // Eye Shine
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(36, 10, 0.9, 0, Math.PI * 2);
        ctx.fill();

        // Cute Pink Nose
        ctx.fillStyle = '#F50057';
        ctx.beginPath();
        ctx.arc(40, 13, 1.3, 0, Math.PI * 2);
        ctx.fill();

        // Fine Whiskers
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(39, 14); ctx.lineTo(46, 12);
        ctx.moveTo(39, 15); ctx.lineTo(45, 17);
        ctx.stroke();

        // Slender Graceful Tail
        const tailAngle = Math.sin(this.animFrame * 0.8) * 0.35;
        ctx.strokeStyle = '#FF4081';
        ctx.lineWidth = 3.2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(6, 20);
        ctx.quadraticCurveTo(-8 + Math.cos(tailAngle) * 6, 8 + Math.sin(tailAngle) * 10, -10, -2 + Math.sin(tailAngle) * 8);
        ctx.stroke();

        // Long Slender Legs
        ctx.fillStyle = '#FF4081';
        if (this.isGrounded) {
            // Front slender legs
            ctx.fillRect(26 + runCycle * 6, 29, 3, 12);
            ctx.fillRect(32 - runCycle * 6, 29, 3, 12);
            // Back slender legs
            ctx.fillRect(8 - runCycle * 6, 29, 3, 12);
            ctx.fillRect(14 + runCycle * 6, 29, 3, 12);
        } else {
            // Graceful jump pose
            ctx.fillRect(28, 27, 3.5, 9);
            ctx.fillRect(10, 27, 3.5, 9);
        }

        ctx.restore();
    }
}

// Building Class
class Building {
    constructor(x, y, width, palette) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 600; // Extends down below canvas
        this.palette = palette;
        this.windows = [];
        this.generateWindows();
        this.feature = Math.random() < 0.4 ? (Math.random() < 0.5 ? 'ANTENNA' : 'WATER_TANK') : null;
    }

    generateWindows() {
        const rows = 10;
        const cols = Math.floor((this.width - 20) / 32);
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (Math.random() < 0.75) {
                    this.windows.push({
                        relX: 16 + c * 32,
                        relY: 30 + r * 38,
                        lit: Math.random() < 0.65
                    });
                }
            }
        }
    }

    draw(ctx) {
        ctx.save();

        // Building Shadow / Depth Accent
        ctx.fillStyle = this.palette.shadow;
        ctx.fillRect(this.x + 8, this.y, this.width, this.height);

        // Building Main Facade
        ctx.fillStyle = this.palette.main;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Top Roof Ledge Trim
        ctx.fillStyle = this.palette.top;
        ctx.fillRect(this.x - 4, this.y, this.width + 8, 12);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 0.25;
        ctx.fillRect(this.x - 4, this.y, this.width + 8, 3);
        ctx.globalAlpha = 1.0;

        // Windows
        this.windows.forEach(w => {
            const wx = this.x + w.relX;
            const wy = this.y + w.relY;

            if (w.lit) {
                ctx.fillStyle = this.palette.window;
                ctx.shadowColor = this.palette.window;
                ctx.shadowBlur = 6;
            } else {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
                ctx.shadowBlur = 0;
            }

            ctx.fillRect(wx, wy, 18, 24);
            ctx.shadowBlur = 0; // reset
        });

        // Rooftop Features (Antennas / Water Towers)
        if (this.feature === 'ANTENNA') {
            ctx.strokeStyle = this.palette.top;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(this.x + 40, this.y);
            ctx.lineTo(this.x + 40, this.y - 35);
            ctx.stroke();

            // Red beacon tip
            ctx.fillStyle = '#FF1744';
            ctx.beginPath();
            ctx.arc(this.x + 40, this.y - 37, 4, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.feature === 'WATER_TANK') {
            ctx.fillStyle = '#8D6E63';
            ctx.fillRect(this.x + this.width - 50, this.y - 30, 32, 30);
            ctx.fillStyle = '#5D4037';
            ctx.fillRect(this.x + this.width - 54, this.y - 34, 40, 6);
        }

        ctx.restore();
    }
}

// Collectible Class (Fish & Catnip)
class Collectible {
    constructor(x, y, type = 'FISH') {
        this.x = x;
        this.y = y;
        this.baseY = y;
        this.type = type; // 'FISH' or 'CATNIP'
        this.size = 16;
        this.bobOffset = Math.random() * Math.PI * 2;
    }

    update() {
        this.bobOffset += 0.08;
        this.y = this.baseY + Math.sin(this.bobOffset) * 6;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);

        if (this.type === 'FISH') {
            // Golden Fish
            ctx.fillStyle = '#FFD700';
            ctx.shadowColor = '#FFA500';
            ctx.shadowBlur = 10;

            // Fish body
            ctx.beginPath();
            ctx.ellipse(0, 0, 12, 7, 0, 0, Math.PI * 2);
            ctx.fill();

            // Tail fin
            ctx.beginPath();
            ctx.moveTo(-10, 0);
            ctx.lineTo(-17, -7);
            ctx.lineTo(-17, 7);
            ctx.closePath();
            ctx.fill();

            // Eye
            ctx.fillStyle = '#000';
            ctx.beginPath();
            ctx.arc(5, -2, 1.5, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Glowing Catnip Star
            ctx.fillStyle = '#E040FB';
            ctx.shadowColor = '#FF80AB';
            ctx.shadowBlur = 14;

            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * 14, -Math.sin((18 + i * 72) * Math.PI / 180) * 14);
                ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * 6, -Math.sin((54 + i * 72) * Math.PI / 180) * 6);
            }
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    }
}

// Particle Effect Class
class Particle {
    constructor(x, y, vx, vy, color, size, life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = size;
        this.maxLife = life;
        this.life = life;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Launch Game on Window Load
window.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.loop();
});
