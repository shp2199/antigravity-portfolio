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

let currentIndex = 1; // Start at 1 so the first click goes to index 2
const title = document.querySelector('h1');
const subline = document.querySelector('p');
const container = document.querySelector('.container');

// Initial state - check if it's currently Home
window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1) || 'home';
    if (hash === 'home') {
        const korean = greetings[1]; // 안녕 세상아
        title.innerText = korean.text;
        title.style.color = korean.color;
        subline.innerText = `Greeting in ${korean.lang}`;
        title.style.display = 'block';
    }
});

function updateGreeting() {
    // Skip Korean (index 1) on subsequent clicks
    currentIndex = (currentIndex + 1) % greetings.length;
    if (currentIndex === 1) currentIndex = (currentIndex + 1) % greetings.length;

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

    // Cursor movement with -30deg tilt
    cursorOuter.style.transform = `translate(${x}px, ${y}px) rotate(-30deg)`;
    cursorInner.style.transform = `translate(${x}px, ${y}px) rotate(-30deg)`;

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

const colors = ['#ff3e3e', '#f9d71c', '#0076a3', '#fb923c', '#4ade80', '#c084fc', '#fda4af'];

function updateActiveSection(targetId) {
    const activeColors = [...colors];
    let usedH2Color = null;

    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetId) {
            section.classList.add('active');

            // Randomize H2 color
            const h2 = section.querySelector('h2');
            if (h2) {
                usedH2Color = activeColors[Math.floor(Math.random() * activeColors.length)];
                h2.style.color = usedH2Color;
            }

            // Randomize Profile Name in About section
            const profileName = section.querySelector('.profile-name');
            if (profileName) {
                // Stricter distinct color: exclude usedH2Color and similar ones if possible
                const distinctColors = activeColors.filter(c => c !== usedH2Color);
                const nameColor = distinctColors[Math.floor(Math.random() * distinctColors.length)];
                profileName.style.background = nameColor;
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active-nav');
        const linkId = link.getAttribute('href').substring(1);

        if (linkId === targetId) {
            link.classList.add('active-nav');
            link.style.background = '#ffffff'; // White for active
            link.style.color = '#000000';
        } else {
            // Random color for inactive
            link.style.background = activeColors[Math.floor(Math.random() * activeColors.length)];
            link.style.color = '#2b2b2b';
        }
    });
}

// Sync Nav with Scroll Position (for Snap Scroll)
document.addEventListener('scroll', () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    if (current) {
        navLinks.forEach((link) => {
            link.classList.remove("active-nav");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active-nav");
                link.style.background = '#ffffff';
            } else {
                // Don't re-randomize color on scroll, just keep them unless clicked
            }
        });
    }
}, { passive: true });



navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        updateActiveSection(targetId);
        history.pushState(null, null, `#${targetId}`);
    });
});

window.addEventListener('load', () => {
    const hash = window.location.hash.substring(1) || 'home';
    updateActiveSection(hash);
    renderLeaderboard();
});

// --- Pokepi Deluxe Mini-Game ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-game');
const selectionUI = document.getElementById('game-selection');
const charOpts = document.querySelectorAll('.char-opt');
const gameArea = document.getElementById('game-canvas-area');
const scoreForm = document.getElementById('high-score-form');
const saveScoreBtn = document.getElementById('save-score');
const nicknameInput = document.getElementById('nickname');
const scoreList = document.getElementById('score-list');

let gameRunning = false;
let player = { x: 235, y: 460, size: 30, color: '#f9d71c', char: 'bulbasaur' };
let enemies = [];
let score = 0;
let stage = 0;
let stageColor = '#c6e3b8'; // Initial grass color
const stageColors = ['#c6e3b8', '#b8e3d5', '#e3d5b8', '#d5b8e3', '#e3b8b8'];
let frameId;


const charData = {
    bulbasaur: { color: '#4ade80', dex: 'No.0001' },
    quaxly: { color: '#60a5fa', dex: 'No.0912' },
    pikachu: { color: '#fde047', dex: 'No.0025' },
    ditto: { color: '#c084fc', dex: 'No.0132' },
    slowpoke: { color: '#fda4af', dex: 'No.0079' },
    gengar: { color: '#a78bfa', dex: 'No.0094' }
};

charOpts.forEach(opt => {
    opt.addEventListener('click', () => {
        charOpts.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        player.char = opt.dataset.char;
        player.color = charData[player.char].color;
    });
});

// Character Preview Initializer
function initCharacterPreviews() {
    charOpts.forEach(opt => {
        const charType = opt.dataset.char;
        const canvas = opt.querySelector('canvas');
        if (canvas) {
            const pctx = canvas.getContext('2d');
            pctx.clearRect(0, 0, 40, 40);
            drawPokemon(charType, 5, 5, 30, pctx);
        }
    });
}
window.addEventListener('load', initCharacterPreviews);



function drawPokemon(type, x, y, size, targetCtx = ctx) {
    targetCtx.save();
    targetCtx.translate(x, y);
    targetCtx.lineWidth = 2;
    targetCtx.strokeStyle = '#000';

    if (type === 'bulbasaur') {
        targetCtx.fillStyle = '#4ade80';
        targetCtx.fillRect(0, 10, size, size - 10);
        targetCtx.fillStyle = '#166534';
        targetCtx.fillRect(size * 0.2, 0, size * 0.6, 10);
        targetCtx.fillStyle = '#4ade80';
        // Ears
        targetCtx.beginPath(); targetCtx.moveTo(0, 10); targetCtx.lineTo(5, 0); targetCtx.lineTo(10, 10); targetCtx.fill(); targetCtx.stroke();
        targetCtx.beginPath(); targetCtx.moveTo(size - 10, 10); targetCtx.lineTo(size - 5, 0); targetCtx.lineTo(size, 10); targetCtx.fill(); targetCtx.stroke();
    } else if (type === 'pikachu') {
        targetCtx.fillStyle = '#fde047';
        targetCtx.fillRect(0, 10, size, size - 10);
        // Ears
        targetCtx.fillStyle = '#fde047';
        targetCtx.fillRect(0, -10, 8, 20);
        targetCtx.fillRect(size - 8, -10, 8, 20);
        targetCtx.fillStyle = '#000';
        targetCtx.fillRect(0, -10, 8, 5);
        targetCtx.fillRect(size - 8, -10, 8, 5);
    } else if (type === 'quaxly') {
        targetCtx.fillStyle = '#fff';
        targetCtx.fillRect(0, 10, size, size - 10);
        targetCtx.fillStyle = '#60a5fa';
        targetCtx.beginPath(); targetCtx.arc(size / 2, 10, size / 2, Math.PI, 0); targetCtx.fill(); targetCtx.stroke();
        targetCtx.fillStyle = '#fbbf24'; // Beak
        targetCtx.fillRect(size / 2 - 5, size * 0.5, 10, 5);
    } else if (type === 'slowpoke') {
        targetCtx.fillStyle = '#fda4af';
        targetCtx.fillRect(0, 10, size, size - 10);
        // Small ears
        targetCtx.beginPath(); targetCtx.arc(5, 10, 5, Math.PI, 0); targetCtx.fill(); targetCtx.stroke();
        targetCtx.beginPath(); targetCtx.arc(size - 5, 10, 5, Math.PI, 0); targetCtx.fill(); targetCtx.stroke();
        targetCtx.fillStyle = '#fff'; // Muzzle
        targetCtx.fillRect(size * 0.2, size * 0.6, size * 0.6, 10);
    } else if (type === 'gengar') {
        targetCtx.fillStyle = '#a78bfa';
        targetCtx.beginPath();
        targetCtx.moveTo(0, 10); targetCtx.lineTo(size * 0.2, 0); targetCtx.lineTo(size * 0.4, 10);
        targetCtx.lineTo(size * 0.6, 10); targetCtx.lineTo(size * 0.8, 0); targetCtx.lineTo(size, 10);
        targetCtx.lineTo(size, size); targetCtx.lineTo(0, size); targetCtx.closePath();
        targetCtx.fill(); targetCtx.stroke();
    } else { // Ditto
        targetCtx.fillStyle = '#c084fc';
        targetCtx.beginPath();
        targetCtx.ellipse(size / 2, size / 2, size / 2, size / 2.5, 0, 0, Math.PI * 2);
        targetCtx.fill(); targetCtx.stroke();
    }

    // Ditto Face for all
    targetCtx.fillStyle = '#000';
    targetCtx.beginPath(); targetCtx.arc(size * 0.3, size * 0.5, 1.5, 0, Math.PI * 2); targetCtx.fill();
    targetCtx.beginPath(); targetCtx.arc(size * 0.7, size * 0.5, 1.5, 0, Math.PI * 2); targetCtx.fill();
    targetCtx.beginPath();
    targetCtx.moveTo(size * 0.35, size * 0.7);
    targetCtx.quadraticCurveTo(size / 2, size * 0.8, size * 0.65, size * 0.7);
    targetCtx.stroke();

    targetCtx.restore();
}


startBtn.addEventListener('click', () => {
    selectionUI.style.display = 'none';
    gameArea.style.display = 'block';
    gameArea.scrollIntoView({ behavior: 'smooth' });
    resetGame();
    gameRunning = true;
    gameLoop();
});




function resetGame() {
    player.x = 235;
    player.y = 460;
    enemies = [];
    score = 0;
    stage = 0;
    stageColor = stageColors[0];
    for (let i = 0; i < 7; i++) {
        spawnEnemy(i * 60 + 40, i);
    }
}


function spawnEnemy(y, laneIndex) {
    const speed = (Math.random() * 2 + 1 + stage * 0.2) * (Math.random() > 0.5 ? 1 : -1);
    const laneColors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];
    enemies.push({
        x: Math.random() * 450,
        y: y,
        w: 60 + Math.random() * 60,
        h: 35,
        speed: speed,
        color: laneColors[laneIndex % laneColors.length]
    });
}


function drawEnemies() {
    enemies.forEach(en => {
        ctx.fillStyle = en.color; // Use lane-specific color
        ctx.fillRect(en.x, en.y, en.w, en.h);
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.strokeRect(en.x, en.y, en.w, en.h);

        ctx.strokeStyle = '#fff';
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(en.x + 2, en.y + en.h / 2, en.w - 4, 1);
        ctx.setLineDash([]);

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
    const leaderboard = document.getElementById('leaderboard');
    if (isHighScore(score)) {
        scoreForm.style.display = 'block';
        if (leaderboard) leaderboard.style.display = 'block';
    } else {
        alert(`GAME OVER! Final Score: ${score}`);
        if (leaderboard) leaderboard.style.display = 'block';
        exitGame();
    }
}


function exitGame() {
    gameArea.style.display = 'none';
    selectionUI.style.display = 'block';
    scoreForm.style.display = 'none';
    renderLeaderboard();
}

function gameLoop() {
    if (!gameRunning) return;
    ctx.clearRect(0, 0, 500, 500);

    // Draw Background
    for (let i = 0; i < 500; i += 60) {
        ctx.fillStyle = i === 0 || i >= 420 ? stageColor : '#64748b'; // Stage color for grass
        ctx.fillRect(0, i, 500, 60);
        if (i > 0 && i < 420) {
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(500, i); ctx.stroke();
        }
    }


    drawEnemies();
    drawPokemon(player.char, player.x, player.y, player.size);

    ctx.fillStyle = '#000';
    ctx.font = 'bold 24px Outfit';
    ctx.fillText(`SCORE: ${score}`, 20, 40);

    frameId = requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;

    // Prevent default scrolling for arrow keys when game is running
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'w', 'a', 's', 'd'].includes(e.key.toLowerCase())) {
        e.preventDefault();
    }

    const move = 30;
    if (['ArrowUp', 'w', 'W'].includes(e.key)) { player.y -= move; score++; }
    if (['ArrowDown', 's', 'S'].includes(e.key)) player.y += move;
    if (['ArrowLeft', 'a', 'A'].includes(e.key)) player.x -= move;
    if (['ArrowRight', 'd', 'D'].includes(e.key)) player.x += move;


    player.x = Math.max(0, Math.min(500 - player.size, player.x));
    player.y = Math.max(-player.size, Math.min(460, player.y));

    if (player.y < 0) {
        player.y = 460;
        score += 50;
        stage++;
        stageColor = stageColors[stage % stageColors.length];
        // Speed up enemies slightly on each stage
        enemies.forEach(en => en.speed *= 1.1);
    }

});

// --- Leaderboard Logic ---
function getScores() {
    const s = localStorage.getItem('pokepia_v2_scores');
    return s ? JSON.parse(s) : [];
}

function isHighScore(s) {
    if (s === 0) return false;
    const scores = getScores();
    return scores.length < 10 || s > scores[scores.length - 1].score;
}

function saveScore(name, s) {
    let scores = getScores();
    scores.push({ name, score: s });
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 10);
    localStorage.setItem('pokepia_v2_scores', JSON.stringify(scores));
}

function renderLeaderboard() {
    const scores = getScores();
    scoreList.innerHTML = scores.map((s, i) => `
        <li>
            <span>#${i + 1} ${s.name}</span>
            <span>${s.score}</span>
        </li>
    `).join('') || '<li>No ranking yet</li>';
}

saveScoreBtn.addEventListener('click', () => {
    const name = nicknameInput.value.trim() || 'NoName';
    saveScore(name, score);
    nicknameInput.value = '';
    exitGame();
});


