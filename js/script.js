// --- Greeting Logic ---
const greetings = [
    { text: "Hello World", lang: "English", color: "#ff3e3e" },
    { text: "안녕 세상아", lang: "Korean", color: "#0076a3" },
    { text: "こんにちは世界", lang: "Japanese", color: "#f9d71c" },
    { text: "Hola Mundo", lang: "Spanish", color: "#ff3e3e" },
    { text: "Bonjour le monde", lang: "French", color: "#0076a3" },
    { text: "Ciao Mondo", lang: "Italian", color: "#f9d71c" },
    { text: "Hallo Welt", lang: "German", color: "#ff3e3e" },
    { text: "你好世界", lang: "Chinese", color: "#0076a3" }
];

let currentIndex = 0;
const title = document.querySelector('h1');
const subline = document.querySelector('p');
const container = document.querySelector('.container');

function updateGreeting() {
    currentIndex = (currentIndex + 1) % greetings.length;
    const current = greetings[currentIndex];

    container.classList.add('bouncing');

    setTimeout(() => {
        title.innerText = current.text;
        title.style.color = current.color;
        subline.innerText = `Greeting in ${current.lang}`;
        container.classList.remove('bouncing');
    }, 200);
}

if (container) {
    container.addEventListener('click', updateGreeting);
}

// --- Floating Bricks Logic ---
const particlesContainer = document.getElementById('particles-container');

function createBrick() {
    if (!particlesContainer) return;
    const brick = document.createElement('div');
    brick.className = 'brick';

    const colors = ['#ff3e3e', '#f9d71c', '#0076a3', '#ffffff'];
    brick.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const size = Math.random() * 15 + 10;
    brick.style.width = size + 'px';
    brick.style.height = size + 'px';
    brick.style.borderRadius = '4px';
    brick.style.border = '2px solid #2b2b2b';

    brick.style.left = Math.random() * 100 + 'vw';
    brick.style.top = '110vh';

    const duration = Math.random() * 5 + 7;
    brick.style.animationDuration = duration + 's';
    brick.style.animationDelay = Math.random() * 5 + 's';

    particlesContainer.appendChild(brick);

    setTimeout(() => {
        brick.remove();
    }, (duration + 5) * 1000);
}

for (let i = 0; i < 15; i++) {
    createBrick();
}
setInterval(createBrick, 800);

// --- Custom Cursor Logic ---
const cursorOuter = document.querySelector('.cursor-outer');
const cursorInner = document.querySelector('.cursor-inner');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Cursor movement (aligned with triangle tip)
    cursorOuter.style.transform = `translate(${x}px, ${y}px)`;
    cursorInner.style.transform = `translate(${x}px, ${y}px)`;

    // Create Fairy Dust (Particles)
    createDust(x, y);
});

function createDust(x, y) {
    const dust = document.createElement('div');
    dust.className = 'dust';

    const size = Math.random() * 6 + 2;
    dust.style.width = size + 'px';
    dust.style.height = size + 'px';

    const colors = ['#ff3e3e', '#f9d71c', '#0076a3', '#ffffff'];
    dust.style.background = colors[Math.floor(Math.random() * colors.length)];

    dust.style.left = x + 'px';
    dust.style.top = y + 'px';

    // Spread effect
    const destX = (Math.random() - 0.5) * 50;
    const destY = (Math.random() - 0.5) * 50;
    dust.animate([
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'ease-out'
    });

    document.body.appendChild(dust);
    setTimeout(() => {
        dust.remove();
    }, 1000);
}

// --- Navigation Logic ---
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

function updateActiveSection(targetId) {
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetId) {
            section.classList.add('active');

            // Randomize H2 color in the active section
            const h2 = section.querySelector('h2');
            if (h2) {
                const colors = ['#ff3e3e', '#f9d71c', '#0076a3', '#fb923c', '#4ade80'];
                h2.style.color = colors[Math.floor(Math.random() * colors.length)];
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        if (link.getAttribute('href').substring(1) === targetId) {
            link.classList.add('active-nav');
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        updateActiveSection(targetId);
        history.pushState(null, null, `#${targetId}`);
    });
});

// Handle initial hash or Home
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1) || 'home';
    updateActiveSection(hash);
});

// --- Pokepi Crossy Mini-Game ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-game');
const selectionUI = document.getElementById('game-selection');
const charOpts = document.querySelectorAll('.char-opt');

let gameRunning = false;
let player = { x: 235, y: 460, size: 30, color: '#f9d71c', char: 'bulbasaur' };
let enemies = [];
let score = 0;
let frameId;

const charColors = {
    bulbasaur: '#4ade80',
    quaxly: '#60a5fa',
    pikachu: '#fde047',
    ditto: '#c084fc',
    slowpoke: '#fda4af',
    gengar: '#a78bfa'
};

charOpts.forEach(opt => {
    opt.addEventListener('click', () => {
        charOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        player.char = opt.dataset.char;
        player.color = charColors[player.char];
    });
});

startBtn.addEventListener('click', () => {
    selectionUI.style.display = 'none';
    canvas.style.display = 'block';
    resetGame();
    gameRunning = true;
    gameLoop();
});

function resetGame() {
    player.x = 235;
    player.y = 460;
    enemies = [];
    score = 0;
    for (let i = 0; i < 6; i++) {
        spawnEnemy(i * 60 + 50);
    }
}

function spawnEnemy(y) {
    const speed = (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1);
    enemies.push({ x: Math.random() * 450, y: y, w: 40 + Math.random() * 40, h: 30, speed: speed });
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
    // Ditto Face
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x + 8, player.y + 10, 2, 2);
    ctx.fillRect(player.x + 20, player.y + 10, 2, 2);
    ctx.beginPath();
    ctx.arc(player.x + 15, player.y + 20, 5, 0, Math.PI);
    ctx.stroke();
}

function drawEnemies() {
    ctx.fillStyle = '#ff3e3e';
    enemies.forEach(en => {
        ctx.fillRect(en.x, en.y, en.w, en.h);
        en.x += en.speed;
        if (en.x > 500) en.x = -en.w;
        if (en.x < -en.w) en.x = 500;

        // Collision
        if (player.x < en.x + en.w && player.x + player.size > en.x &&
            player.y < en.y + en.h && player.y + player.size > en.y) {
            gameOver();
        }
    });
}

function gameOver() {
    gameRunning = false;
    cancelAnimationFrame(frameId);
    alert(`Game Over! Score: ${score}`);
    selectionUI.style.display = 'block';
    canvas.style.display = 'none';
}

function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, 500, 500);

    // Draw Grass Lines
    ctx.strokeStyle = 'rgba(0,0,0,0.05)';
    for (let i = 0; i < 500; i += 50) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(500, i); ctx.stroke();
    }

    drawEnemies();
    drawPlayer();

    // Score
    ctx.fillStyle = '#000';
    ctx.font = '20px Outfit';
    ctx.fillText(`Score: ${score}`, 10, 30);

    frameId = requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    if (e.key === 'ArrowUp') { player.y -= 30; score++; }
    if (e.key === 'ArrowDown') player.y += 30;
    if (e.key === 'ArrowLeft') player.x -= 30;
    if (e.key === 'ArrowRight') player.x += 30;

    if (player.y < 0) {
        player.y = 460;
        score += 10; // Bonus for reaching the top
    }
});

